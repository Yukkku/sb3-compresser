export type scalarVal = string | number | boolean;
export type assetId = string;
export type costume = {
	name: string,
	dataFormat: "png" | "svg" | "jpeg" | "jpg" | "bmp" | "gif",
	bitmapResolution?: number,
	assetId: assetId,
	md5ext?: `${assetId}.${string}`,
	rotationCenterX?: number,
	rotationCenterY?: number,
	asset?: unknown,
};
export type sound = {
	name: string,
	dataFormat: "wav" | "wave" | "mp3",
	assetId: assetId,
	md5ext?: `${assetId}.${string}`,
	rate?: number,
	sampleCount?: number,
};
export type scalarVariable = [string, scalarVal] | [string, scalarVal, true];
export type list = [string, scalarVal[]];
export type broadcastMessage = string;
export type numPrimitive = [4 | 5 | 6 | 7 | 8, string | number];
export type colorPrimitive = [9, `#${string}`];
export type textPrimitive = [10, string | number];
export type broadcastPrimitive = [11, string, string];
export type variablePrimitive = [12, string, string, ...([] | [number] | [number, number])];
export type listPrimitive = [13, string, string, ...([] | [number] | [number, number])];
export type topLevelPrimitive = variablePrimitive | listPrimitive;
export type inputPrimitive = numPrimitive | colorPrimitive | textPrimitive | broadcastPrimitive | variablePrimitive | listPrimitive;

export type block = {
	opcode: string,
	comment?: string,
	inputs?: { [_: string]: [1 | 2 | 3, ...(string | null | inputPrimitive)[]] },
	fields?: { [_: string]: unknown },
	next?: string | null,
	topLevel?: boolean,
	parent?: string | null,
	shadow?: boolean,
	x?: number,
	y?: number,
	mutation?: {
		tagName?: "mutation",
		children?: unknown[],
		proccode?: string,
		argumentids?: string,
		warp?: boolean | null | `${boolean | null}`,
		hasnext?: boolean | null | `${boolean | null}`,
	},
};

export type comment = {
	blockId?: string | null,
	text: string,
	minimized?: boolean,
	x?: number | null,
	y?: number | null,
	width?: number,
	height?: number,
};

export type target = {
	isStage: boolean,
	name: string,
	varibals: { [_: string]: scalarVariable },
	lists?: { [_: string]: list },
	broadcasts?: { [_: string]: broadcastMessage },
	comments?: { [_: string]: comment },
	blocks: { [_: string]: block | topLevelPrimitive },
	currentCostume?: number,
	costumes: [costume, ...costume[]],
	sounds: sound[],
	volume?: number,
	tempo?: unknown,
	videoTransparency?: unknown,
	videoState?: unknown,
	textToSpeechLanguage?: unknown,
	x?: unknown,
	y?: unknown,
	direction?: unknown,
	size?: unknown,
	visible?: unknown,
	rotationStyle?: unknown,
	draggable?: unknown,
};

export type stage = target & {
	name: "Stage",
	isStage: true,
	tempo?: number,
	videoTranparency?: number,
	videoState?: "on" | "off" | "on-flipped",
	layerOrder?: 0,
};

export type sprite = target & {
	isStage: false,
	visible?: boolean,
	x?: number,
	y?: number,
	size?: number,
	direction?: number,
	draggable?: boolean,
	rotationStyle?: "all around" | "don't rotate" | "left-right",
	layerOrder?: number,
};

export type sb3 = {
	targets: [] | [stage, ...sprite[]],
	monitors?: unknown,
	extensions?: unknown,
	meta: {
		semver: `3.${string}.${string}`,
		vm?: `${string}.${string}.${string}${"" | `-${string}`}`,
		agent?: string,
		origin?: string,
	},
};
