interface UrlInputSectionProps {
  url: string;
  setUrl: (url: string) => void;
  input: string;
  setInput: (input: string) => void;
  isLoading: boolean;
  fetchJsonFromUrl: () => void;
}

export function UrlInputSection({
  url,
  setUrl,
  input,
  setInput,
  isLoading,
  fetchJsonFromUrl,
}: UrlInputSectionProps) {
  return (
    <section className="bg-white rounded-2xl shadow p-4 mb-4">
      <label className="mb-2 font-semibold">URL入力</label>
      <div className="flex gap-2 mb-4">
        <input
          type="url"
          className={`flex-1 rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="JSONデータを取得するURLを入力してください"
          disabled={isLoading}
        />
        <button
          onClick={fetchJsonFromUrl}
          disabled={isLoading || !url.trim()}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium flex items-center gap-2"
        >
          {isLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          )}
          取得
        </button>
      </div>
      <div>
        <label className="mb-2 font-semibold">データ入力</label>
        <textarea
          className={`font-mono w-full min-h-[120px] resize-y rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="JSONデータまたは\\uXXXX形式のUnicode文字列を貼り付けてください"
          spellCheck={false}
          disabled={isLoading}
        />
      </div>
    </section>
  );
}
