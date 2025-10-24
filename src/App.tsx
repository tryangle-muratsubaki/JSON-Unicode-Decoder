import React, { useState } from 'react';
import { useJsonDecoder } from './hooks/useJsonDecoder';
import { useFeedback } from './hooks/useFeedback';
import {
  DisplayModeToggle,
  UrlInputSection,
  InputDisplay,
  OutputDisplay,
  SettingsModal,
} from './components';

export default function App() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);

  const {
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
    output,
    meta,
    formattedInput,
    fetchJsonFromUrl,
  } = useJsonDecoder();

  const {
    copyFeedback,
    downloadFeedback,
    copyInputFeedback,
    downloadInputFeedback,
    showCopyFeedback,
    showDownloadFeedback,
    showCopyInputFeedback,
    showDownloadInputFeedback,
  } = useFeedback();

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      showCopyFeedback('コピーしました！');
    } catch {
      showCopyFeedback('コピーに失敗しました');
    }
  };

  const onDownload = () => {
    const blob = new Blob([output], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download =
      meta.kind === 'json-array' || meta.kind === 'json-object'
        ? 'decoded.json'
        : 'decoded.txt';
    a.click();
    URL.revokeObjectURL(url);
    showDownloadFeedback('ダウンロードしました！');
  };

  const onCopyInput = async () => {
    try {
      await navigator.clipboard.writeText(formattedInput);
      showCopyInputFeedback('コピーしました！');
    } catch {
      showCopyInputFeedback('コピーに失敗しました');
    }
  };

  const onDownloadInput = () => {
    const blob = new Blob([formattedInput], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
    showDownloadInputFeedback('ダウンロードしました！');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 relative">
      {/* ローディングオーバーレイ */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
            <div className="text-lg font-medium text-gray-900">
              データを取得中...
            </div>
            <div className="text-sm text-gray-500">しばらくお待ちください</div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-8xl space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            JSON Unicode Decoder
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500"></div>
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
              title="設定"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </header>

        <UrlInputSection
          url={url}
          setUrl={setUrl}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          fetchJsonFromUrl={fetchJsonFromUrl}
        />

        <DisplayModeToggle
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
          disabled={isLoading}
        />

        <section
          className={`grid gap-4 ${
            displayMode === 'compare'
              ? 'grid-cols-1 lg:grid-cols-2'
              : 'grid-cols-1'
          }`}
        >
          {(displayMode === 'compare' || displayMode === 'input') && (
            <InputDisplay
              formattedInput={formattedInput}
              mode={mode}
              setMode={setMode}
              indent={indent}
              setIndent={setIndent}
              onCopyInput={onCopyInput}
              onDownloadInput={onDownloadInput}
              copyInputFeedback={copyInputFeedback}
              downloadInputFeedback={downloadInputFeedback}
              disabled={isLoading}
            />
          )}

          {(displayMode === 'compare' || displayMode === 'output') && (
            <OutputDisplay
              output={output}
              meta={meta}
              onCopy={onCopy}
              onDownload={onDownload}
              copyFeedback={copyFeedback}
              downloadFeedback={downloadFeedback}
              disabled={isLoading}
            />
          )}
        </section>

        <footer className="text-xs text-gray-500">
          使い方:
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              URL入力欄にJSONデータのURLを入力して「取得」ボタンをクリックすると、自動的にデータを取得してデコードします。
            </li>
            <li>
              表示モードで「比較表示」「Inputのみ」「Outputのみ」を切り替えできます。
            </li>
            <li>
              自動モードでは JSON → NDJSON → 文字列 の順で解析を試行します。
            </li>
            <li>
              JSON.stringifyはデフォルトで読みやすいUnicodeを出力するため、\\uXXXX
              が日本語になります。
            </li>
            <li>NDJSON: 1行に1つのJSONオブジェクト。空行は無視されます。</li>
          </ul>
        </footer>
      </div>

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        mode={mode}
        setMode={setMode}
        indent={indent}
        setIndent={setIndent}
        disabled={isLoading}
      />
    </div>
  );
}
