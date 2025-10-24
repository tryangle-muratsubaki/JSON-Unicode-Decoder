import { ModeToggle } from './ModeToggle';
import type { ParseMode } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ParseMode;
  setMode: (mode: ParseMode) => void;
  indent: number;
  setIndent: (indent: number) => void;
  disabled?: boolean;
}

export function SettingsModal({
  isOpen,
  onClose,
  mode,
  setMode,
  indent,
  setIndent,
  disabled = false,
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">設定</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/50"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* 解析モード設定 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              解析モード
            </label>
            <ModeToggle mode={mode} setMode={setMode} disabled={disabled} />
          </div>

          {/* インデント設定 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              インデント
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={8}
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                disabled={disabled}
                className={`w-20 rounded-lg border border-gray-200 p-2 font-mono ${
                  disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
              <span className="text-sm text-gray-600">スペース</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            disabled={disabled}
            className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
