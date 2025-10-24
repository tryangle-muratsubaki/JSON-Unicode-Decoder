import type { ParseMode } from '../types';

interface ModeToggleProps {
  mode: ParseMode;
  setMode: (mode: ParseMode) => void;
  disabled?: boolean;
}

export function ModeToggle({
  mode,
  setMode,
  disabled = false,
}: ModeToggleProps) {
  const btn = (m: ParseMode, label: string) => (
    <button
      key={m}
      onClick={() => setMode(m)}
      disabled={disabled}
      className={`px-3 py-2 rounded-xl text-sm border ${
        mode === m
          ? 'bg-indigo-600 text-white border-indigo-600'
          : 'bg-white border-gray-200 hover:bg-gray-50'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {label}
    </button>
  );
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">モード</span>
      {btn('auto', '自動')}
      {btn('json', 'JSONのみ')}
      {btn('string', '文字列のみ')}
    </div>
  );
}
