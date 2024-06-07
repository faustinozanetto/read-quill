import React, { ElementRef, useRef } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  useToast,
  Button,
  CopyIcon,
  DownloadIcon,
  Separator,
  Skeleton,
  LoadingIcon,
} from '@read-quill/design-system';
import { useQRCode } from '@modules/common/hooks/use-qr-code';
import { __URL__ } from '@modules/common/lib/common.constants';
import Image from 'next/image';
import { useCopyToClipboard } from '@modules/common/hooks/use-copy-to-clipboard';
import { toBlob } from 'html-to-image';
import { useDownloadImage } from '@modules/common/hooks/use-download-image';
import { Book } from '@read-quill/database';

interface BookQRProps {
  book: Book;
  qrButton: React.ReactNode;
}

const BookQR: React.FC<BookQRProps> = (props) => {
  const { qrButton, book } = props;

  const { toast } = useToast();

  const qrImageRef = useRef<ElementRef<'img'> | null>(null);

  const { encodedQR } = useQRCode({ urlToEncode: `${__URL__}/books/${book.id}` });

  const { copyToClipboard } = useCopyToClipboard({
    onSuccess: () => {
      toast({ variant: 'success', content: 'QR copied to clipboard!' });
    },
  });
  const { isPending: isDownloadPending, downloadImage } = useDownloadImage({
    imageRef: qrImageRef,
    onSuccess: () => {
      toast({ variant: 'success', content: 'QR downloaded successfully!' });
    },
  });

  const handleCopyQr = async () => {
    if (!encodedQR || !qrImageRef.current) return;

    try {
      const blob = await toBlob(qrImageRef.current, {
        pixelRatio: 2.5,
        quality: 1,
        skipFonts: true,
      });
      if (!blob) return;

      const items: ClipboardItems = [
        new window.ClipboardItem({
          [blob.type]: blob,
        }),
      ];
      await copyToClipboard(items);
    } catch (err) {
      toast({ variant: 'error', content: 'Could not copy qr to clipboard!' });
    }
  };

  const handleDownloadQr = async () => {
    if (!encodedQR || !qrImageRef.current) return;

    try {
      const filename = `${book.name}-qr.png`;
      await downloadImage(filename);
    } catch (err) {}
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{qrButton}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Book QR</DialogTitle>
          <DialogDescription>Visualize the QR code for your book down here.</DialogDescription>
        </DialogHeader>
        {encodedQR ? (
          <Image ref={qrImageRef} src={encodedQR} alt="qr" className="mx-auto" width={300} height={300} />
        ) : (
          <Skeleton className="w-full aspect-square" />
        )}
        <Separator />
        <div className="grid grid-cols-2 gap-2">
          <Button aria-label="Download QR Code" disabled={isDownloadPending} onClick={handleDownloadQr}>
            {isDownloadPending ? <LoadingIcon className="mr-2" /> : <DownloadIcon className="mr-2" />} Download
          </Button>
          <Button aria-label="Copy QR Code" variant="outline" onClick={handleCopyQr}>
            <CopyIcon className="mr-2" />
            Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookQR;
