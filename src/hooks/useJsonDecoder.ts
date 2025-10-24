import { useMemo, useState } from 'react';
import type { DisplayMode, ParseMode, DecoderResult } from '../types';
import { transform, formatInput } from '../utils/jsonUtils';

// ローディング時間の設定（ミリ秒）
const MINIMUM_LOADING_TIME = 1500;

export function useJsonDecoder() {
  const [input, setInput] = useState<string>('');
  const [mode, setMode] = useState<ParseMode>('auto');
  const [indent, setIndent] = useState<number>(2);
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('compare');

  const { output, meta, formattedInput } = useMemo((): DecoderResult => {
    // ローディング中は前回の結果を維持
    if (isLoading) {
      return {
        output: '',
        meta: { kind: 'string' },
        formattedInput: input,
      };
    }

    try {
      const res = transform(input, { mode, indent });
      // Input欄も整形して表示
      const inputFormatted = formatInput(input, { indent });
      return { ...res, formattedInput: inputFormatted };
    } catch (e: any) {
      return {
        output: '',
        meta: { kind: 'error', details: String(e?.message || e) },
        formattedInput: input,
      };
    }
  }, [input, mode, indent, isLoading]);

  const fetchJsonFromUrl = async () => {
    if (!url.trim() || isLoading) return;

    const startTime = Date.now();
    setIsLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTPエラー! ステータス: ${response.status}`);
      }
      const jsonData = await response.text();
      setInput(jsonData);

      // 最低指定時間はローディング状態を維持
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);
      setTimeout(() => setIsLoading(false), remainingTime);
    } catch (error) {
      console.error('Error fetching JSON:', error);
      setInput(
        `データ取得エラー: ${
          error instanceof Error ? error.message : '不明なエラー'
        }`
      );

      // エラー時も最低指定時間はローディング状態を維持
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);
      setTimeout(() => setIsLoading(false), remainingTime);
    }
  };

  return {
    // State
    input,
    setInput,
    mode,
    setMode,
    indent,
    setIndent,
    url,
    setUrl,
    isLoading,
    displayMode,
    setDisplayMode,
    // Computed
    output,
    meta,
    formattedInput,
    // Actions
    fetchJsonFromUrl,
  };
}
