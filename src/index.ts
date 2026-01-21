#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
	CallToolRequestSchema,
	ListResourcesRequestSchema,
	ListToolsRequestSchema,
	ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";
import { FigmaClient } from "./figma/client.js";

// ESM path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct the path to the .env file
const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

const token = process.env.FIGMA_ACCESS_TOKEN;
if (!token) {
	console.error("Error: FIGMA_ACCESS_TOKEN environment variable is required.");
	process.exit(1);
}

const figmaClient = new FigmaClient(token);

const server = new Server(
	{
		name: "figma-to-angular",
		version: "1.0.0",
	},
	{
		capabilities: {
			tools: {},
			resources: {},
		},
	},
);

// --- Resources ---

async function getResourceFiles(
	dir: string,
	baseUri: string,
): Promise<Array<{ uri: string; name: string; file: string; mime: string }>> {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const resources: Array<{
		uri: string;
		name: string;
		file: string;
		mime: string;
	}> = [];

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			const subResources = await getResourceFiles(
				fullPath,
				`${baseUri}/${entry.name}`,
			);
			resources.push(...subResources);
		} else {
			const ext = path.extname(entry.name);
			const name = path.basename(entry.name, ext);
			// Construct URI: figma-to-angular://docs/primeng/button
			// Base URI for root files: figma-to-angular://rules

			let resourceUri = "";
			let mime = "text/plain";

			if (entry.name === "rules.xml") {
				resourceUri = "figma-to-angular://rules";
				mime = "application/xml";
			} else {
				// Remove .md extension for clean URIs
				resourceUri = `${baseUri}/${name}`;
				mime = "text/markdown";
			}

			resources.push({
				uri: resourceUri,
				name: name,
				file: fullPath,
				mime: mime,
			});
		}
	}
	return resources;
}

server.setRequestHandler(ListResourcesRequestSchema, async () => {
	const resourcePath = path.join(__dirname, "resources");
	try {
		const files = await getResourceFiles(
			resourcePath,
			"figma-to-angular://docs",
		);
		return {
			resources: files.map((f) => ({
				uri: f.uri,
				name: f.name,
				mimeType: f.mime,
				description: `Resource file: ${f.name}`,
			})),
		};
	} catch (error) {
		console.error("Error listing resources:", error);
		return { resources: [] };
	}
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
	const resourcePath = path.join(__dirname, "resources");
	// We need to re-scan to find the file path mapping (inefficient but simple for now)
	// In production, cache this mapping.
	const files = await getResourceFiles(resourcePath, "figma-to-angular://docs");
	const resource = files.find((f) => f.uri === request.params.uri);

	if (resource) {
		const content = await fs.readFile(resource.file, "utf-8");
		return {
			contents: [
				{
					uri: request.params.uri,
					mimeType: resource.mime,
					text: content,
				},
			],
		};
	}

	throw new Error(`Resource not found: ${request.params.uri}`);
});

// --- Tools ---

server.setRequestHandler(ListToolsRequestSchema, async () => {
	return {
		tools: [
			{
				name: "get_figma_node",
				description:
					"Fetch the raw JSON data of a Figma node to be used for code generation.",
				inputSchema: {
					type: "object",
					properties: {
						fileKey: {
							type: "string",
							description: "The Figma file key",
						},
						nodeId: {
							type: "string",
							description: "The ID of the node to fetch",
						},
					},
					required: ["fileKey", "nodeId"],
				},
			},
		],
	};
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
	if (request.params.name === "get_figma_node") {
		const { fileKey, nodeId } = request.params.arguments as {
			fileKey: string;
			nodeId: string;
		};

		try {
			// In a real scenario, we would pass this through a "Normalizer" class
			// to remove unnecessary bloat from the Figma JSON before sending it to the LLM.
			const node = await figmaClient.getNode(fileKey, nodeId);

			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(node, null, 2),
					},
				],
			};
		} catch (error: any) {
			return {
				content: [
					{
						type: "text",
						text: `Error fetching node: ${error.message}`,
					},
				],
				isError: true,
			};
		}
	}

	throw new Error(`Tool not found: ${request.params.name}`);
});

async function run() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("Figma to Angular MCP Server running on stdio");
}

run().catch((error) => {
	console.error("Fatal error running server:", error);
	process.exit(1);
});
