import axios from "axios";
import type { FigmaApiResponse, FigmaNode } from "./types.js";

export class FigmaClient {
	private baseUrl = "https://api.figma.com/v1";
	private token: string;

	constructor(token: string) {
		this.token = token;
	}

	async getNode(fileKey: string, nodeId: string): Promise<FigmaNode> {
		try {
			const response = await axios.get<FigmaApiResponse>(
				`${this.baseUrl}/files/${fileKey}/nodes?ids=${nodeId}`,
				{
					headers: {
						"X-Figma-Token": this.token,
					},
				},
			);

			const nodeData = response.data.nodes[nodeId];
			if (!nodeData) {
				throw new Error(`Node ${nodeId} not found in file ${fileKey}`);
			}

			return nodeData.document;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw new Error(
					`Figma API Error: ${error.response?.data?.err || error.message}`,
				);
			}
			throw error;
		}
	}
}
