export type Meta =
  | { kind: 'json-object' | 'json-array' | 'ndjson' | 'string'; note?: string }
  | { kind: 'error'; details: string; note?: string };

export type DisplayMode = 'compare' | 'input' | 'output';

export type ParseMode = 'auto' | 'json' | 'string';

export interface TransformOptions {
  mode: ParseMode;
  indent: number;
}

export interface TransformResult {
  output: string;
  meta: Meta;
}

export interface DecoderResult extends TransformResult {
  formattedInput: string;
}
