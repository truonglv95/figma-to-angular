export interface FigmaNode {
	id: string;
	name: string;
	type: string;
	children?: FigmaNode[];
	absoluteBoundingBox?: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
	fills?: any[];
	strokes?: any[];
	strokeWeight?: number;
	strokeAlign?: string;
	effects?: any[];
	characters?: string;
	style?: any;
	layoutMode?: "NONE" | "HORIZONTAL" | "VERTICAL";
	primaryAxisSizingMode?: "FIXED" | "AUTO";
	counterAxisSizingMode?: "FIXED" | "AUTO";
	primaryAxisAlignItems?: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
	counterAxisAlignItems?: "MIN" | "CENTER" | "MAX";
	paddingLeft?: number;
	paddingRight?: number;
	paddingTop?: number;
	paddingBottom?: number;
	itemSpacing?: number;
	backgroundColor?: any;
	cornerRadius?: number;
	rectangleCornerRadii?: number[];
}

export interface FigmaFileParsed {
	document: FigmaNode;
	components: { [key: string]: any };
	styles: { [key: string]: any };
}

export interface FigmaApiResponse {
	nodes: {
		[key: string]: {
			document: FigmaNode;
			components: { [key: string]: any };
			styles: { [key: string]: any };
		};
	};
}
