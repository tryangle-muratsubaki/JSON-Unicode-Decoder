import type { DisplayMode } from '../types';

interface DisplayModeToggleProps {
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
  disabled?: boolean;
}

export function DisplayModeToggle({
  displayMode,
  setDisplayMode,
  disabled = false,
}: DisplayModeToggleProps) {
  return (
    <section className="bg-white rounded-2xl shadow p-4 mb-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">表示モード</span>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setDisplayMode('compare')}
            disabled={disabled}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              displayMode === 'compare'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            比較表示
          </button>
          <button
            onClick={() => setDisplayMode('input')}
            disabled={disabled}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              displayMode === 'input'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            INPUTのみ
          </button>
          <button
            onClick={() => setDisplayMode('output')}
            disabled={disabled}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              displayMode === 'output'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            OUTPUTのみ
          </button>
        </div>
      </div>
    </section>
  );
}
