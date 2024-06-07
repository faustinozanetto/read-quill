import { toPng } from 'html-to-image';
import { Options } from 'html-to-image/lib/types';
import { RefObject, useState } from 'react';

interface UseDownloadImageParams {
  imageRef: RefObject<HTMLImageElement>;
  onSuccess: () => void;
  options?: Options;
}

interface UseDownloadImageReturn {
  downloadImage: (fileName: string) => Promise<void>;
  isPending: boolean;
}

export const useDownloadImage = (params: UseDownloadImageParams): UseDownloadImageReturn => {
  const { imageRef, onSuccess, options } = params;

  const [isPending, setIsPending] = useState<boolean>(false);
  const [cachedResult, setCachedResult] = useState<string | null>(null);

  const downloadImage = async (fileName: string): Promise<void> => {
    if (!imageRef.current) return;

    setIsPending(true);
    let result: string | null = cachedResult;
    if (!cachedResult) {
      result = await toPng(imageRef.current, options);
      setCachedResult(result);
    }
    if (!result) {
      setIsPending(false);
      return;
    }

    const link = document.createElement('a');
    link.download = fileName;
    link.href = result;
    link.click();
    link.remove();

    onSuccess();
    setIsPending(false);
  };

  return { downloadImage, isPending };
};
