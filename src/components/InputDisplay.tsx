import { ModeToggle } from './ModeToggle';
import type { ParseMode } from '../types';

interface InputDisplayProps {
  formattedInput: string;
  mode: ParseMode;
  setMode: (mode: ParseMode) => void;
  indent: number;
  setIndent: (indent: number) => void;
  onCopyInput: () => void;
  onDownloadInput: () => void;
  copyInputFeedback: string;
  downloadInputFeedback: string;
  disabled?: boolean;
}

export function InputDisplay({
  formattedInput,
  mode,
  setMode,
  indent,
  setIndent,
  onCopyInput,
  onDownloadInput,
  copyInputFeedback,
  downloadInputFeedback,
  disabled = false,
}: InputDisplayProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <div className="font-semibold">INPUT</div>
          <div className="text-xs text-gray-500">
            整形済み（Unicodeエスケープ保持）
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCopyInput}
            disabled={disabled}
            className={`px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm relative ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            コピー
            {copyInputFeedback && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg border border-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-3 h-3 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {copyInputFeedback}
                  </div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </button>
          <button
            onClick={onDownloadInput}
            disabled={disabled}
            className={`px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm relative ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            ダウンロード
            {downloadInputFeedback && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg border border-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-3 h-3 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {downloadInputFeedback}
                  </div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </button>
        </div>
      </div>
      <pre className="font-mono text-sm leading-6 bg-gray-50 rounded-xl border border-gray-100 p-3 overflow-auto min-h-[320px] whitespace-pre-wrap">
        {formattedInput || '(入力なし)'}
      </pre>
    </div>
  );
}
