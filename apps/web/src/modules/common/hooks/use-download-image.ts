import { toPng } from 'html-to-image';
import { Options } from 'html-to-image/lib/types';
import { RefObject } from 'react';

interface UseDownloadImageParams {
  imageRef: RefObject<HTMLImageElement>;
  onSuccess: () => void;
  options?: Options;
}

interface UseDownloadImageReturn {
  downloadImage: (fileName: string) => Promise<void>;
}

export const useDownloadImage = (params: UseDownloadImageParams): UseDownloadImageReturn => {
  const { imageRef, onSuccess, options } = params;

  const downloadImage = async (fileName: string): Promise<void> => {
    if (!imageRef.current) return;

    const imageResult = await toPng(imageRef.current, options);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = imageResult;
    link.click();
    link.remove();

    onSuccess();
  };

  return { downloadImage };
};
