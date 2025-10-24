import { useState } from 'react';

export function useFeedback() {
  const [copyFeedback, setCopyFeedback] = useState<string>('');
  const [downloadFeedback, setDownloadFeedback] = useState<string>('');
  const [copyInputFeedback, setCopyInputFeedback] = useState<string>('');
  const [downloadInputFeedback, setDownloadInputFeedback] =
    useState<string>('');

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const showDownloadFeedback = (message: string) => {
    setDownloadFeedback(message);
    setTimeout(() => setDownloadFeedback(''), 2000);
  };

  const showCopyInputFeedback = (message: string) => {
    setCopyInputFeedback(message);
    setTimeout(() => setCopyInputFeedback(''), 2000);
  };

  const showDownloadInputFeedback = (message: string) => {
    setDownloadInputFeedback(message);
    setTimeout(() => setDownloadInputFeedback(''), 2000);
  };

  return {
    copyFeedback,
    downloadFeedback,
    copyInputFeedback,
    downloadInputFeedback,
    showCopyFeedback,
    showDownloadFeedback,
    showCopyInputFeedback,
    showDownloadInputFeedback,
  };
}
