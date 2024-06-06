interface UseCopyToClipboardParams {
  onSuccess: () => void;
}

interface UseCopyToClipboardReturn {
  copyToClipboard: (items: ClipboardItems) => Promise<void>;
}

export const useCopyToClipboard = (params: UseCopyToClipboardParams): UseCopyToClipboardReturn => {
  const { onSuccess } = params;

  const copyToClipboard = async (items: ClipboardItems): Promise<void> => {
    await navigator.clipboard.write(items);
    onSuccess();
  };

  return { copyToClipboard };
};
