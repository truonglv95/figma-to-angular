import type { FigmaNode } from "../figma/types.js";

export interface ComponentOutput {
	ts: string;
	html: string;
	css: string;
}

export class AngularConverter {
	convert(node: FigmaNode): ComponentOutput {
		// innovative implementations needed here:
		// 1. Recursive traversal of node.children
		// 2. CSS generation relative to absoluteBoundingBox and styling properties
		// 3. HTML structure mapping

		const componentName = this.sanitizeName(node.name);

		return {
			ts: this.generateTypeScript(componentName),
			html: this.generateHtml(node),
			css: this.generateCss(node),
		};
	}

	private sanitizeName(name: string): string {
		return name.replace(/[^a-zA-Z0-9]/g, "");
	}

	private generateTypeScript(name: string): string {
		return `
import { Component } from '@angular/core';

@Component({
  selector: 'app-${name.toLowerCase()}',
  templateUrl: './${name.toLowerCase()}.component.html',
  styleUrls: ['./${name.toLowerCase()}.component.css'],
  standalone: true
})
export class ${name}Component {}
    `.trim();
	}

	private generateHtml(node: FigmaNode): string {
		return `<!-- Generated from Figma Node: ${node.name} -->\n<div class="${this.sanitizeName(node.name).toLowerCase()}">\n  <!-- Content goes here -->\n</div>`;
	}

	private generateCss(node: FigmaNode): string {
		return `.${this.sanitizeName(node.name).toLowerCase()} {\n  display: block;\n  position: relative;\n}`;
	}
}
