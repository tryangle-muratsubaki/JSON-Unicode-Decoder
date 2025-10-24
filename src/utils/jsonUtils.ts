import type { Meta, TransformOptions, TransformResult } from '../types';

/**
 * Decodes \\uXXXX (and surrogate pairs) inside an arbitrary string.
 * Uses JSON.parse on a quoted & escaped version of the input for correctness.
 */
export function decodeUnicodeString(raw: string): string {
  const safe = raw
    .replace(/\\/g, '\\\\')
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t')
    .replace(/\f/g, '\\f')
    .replace(/\b/g, '\\b')
    .replace(/\v/g, '\\v')
    .replace(/"/g, '\\"');
  try {
    return JSON.parse(`"${safe}"`);
  } catch {
    return raw.replace(/\\u([\\da-fA-F]{4})/g, (_, h) =>
      String.fromCharCode(parseInt(h, 16))
    );
  }
}

export function formatInput(
  input: string,
  { indent }: { indent: number }
): string {
  if (!input.trim()) return '';

  try {
    // JSONとして解析を試行
    const parsed = JSON.parse(input.trim());
    // 整形してから、Unicodeエスケープシーケンスを復元
    const formatted = JSON.stringify(parsed, null, indent);
    return restoreUnicodeEscapes(formatted);
  } catch {
    // JSONでない場合はそのまま返す
    return input;
  }
}

function restoreUnicodeEscapes(str: string): string {
  // デコードされたUnicode文字を元のエスケープシーケンスに戻す
  return str.replace(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, (char) => {
    const code = char.charCodeAt(0);
    return `\\u${code.toString(16).toUpperCase().padStart(4, '0')}`;
  });
}

export function transform(
  input: string,
  { mode, indent }: TransformOptions
): TransformResult {
  input = input ?? '';

  const tryJSON = () => {
    const trimmed = input.trim();
    if (!trimmed) return null;
    try {
      const parsed = JSON.parse(trimmed);
      const meta: Meta = Array.isArray(parsed)
        ? { kind: 'json-array' }
        : { kind: 'json-object' };
      return { output: JSON.stringify(parsed, null, indent), meta } as const;
    } catch {
      return null;
    }
  };

  const tryNDJSON = () => {
    const lines = input
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length <= 1) return null;
    const out: any[] = [];
    for (let i = 0; i < lines.length; i++) {
      try {
        out.push(JSON.parse(lines[i]));
      } catch {
        return null;
      }
    }
    const meta: Meta = { kind: 'ndjson', note: `${out.length} items` };
    return { output: JSON.stringify(out, null, indent), meta } as const;
  };

  const asString = () => {
    const decoded = decodeUnicodeString(input);
    const meta: Meta = { kind: 'string' };
    return { output: decoded, meta } as const;
  };

  if (mode === 'json') {
    const j = tryJSON();
    if (j) return j;
    throw new Error(
      'JSON解析に失敗しました。カンマ、引用符、末尾のカンマなどを確認してください。'
    );
  }

  if (mode === 'string') {
    return asString();
  }

  const j = tryJSON();
  if (j) return j;
  const n = tryNDJSON();
  if (n) return n;
  return asString();
}

export function kindLabel(k: Meta['kind']): string {
  switch (k) {
    case 'json-object':
      return 'JSON (オブジェクト)';
    case 'json-array':
      return 'JSON (配列)';
    case 'ndjson':
      return 'NDJSON (配列)';
    case 'string':
      return 'プレーンテキスト';
    case 'error':
      return 'エラー';
  }
}

// 指定した delay 後に関数を実行し、連続する呼び出しをまとめる
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
