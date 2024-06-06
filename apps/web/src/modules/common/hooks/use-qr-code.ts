import { useCallback, useEffect, useState } from 'react';
import qrcode from 'qrcode';
import { useToast } from '@read-quill/design-system';
import { __URL__ } from '../lib/common.constants';
import { hslToHexS } from '../lib/common.lib';

interface UseQRCodeParams {
  urlToEncode: string;
  options?: qrcode.QRCodeToDataURLOptions;
}

export const useQRCode = (params: UseQRCodeParams) => {
  const { urlToEncode, options } = params;

  const { toast } = useToast();
  const [baseUrl, setBaseUrl] = useState<string>(urlToEncode);
  const [encodedQR, setEncodedQR] = useState<string | null>(null);

  const styles = getComputedStyle(document.documentElement);

  const generateQRCode = useCallback(async () => {
    const background = hslToHexS(styles.getPropertyValue('--background'));
    const color = hslToHexS(styles.getPropertyValue('--primary'));

    const qrCodeDataUrl = await qrcode.toDataURL(urlToEncode, {
      margin: 2,
      width: 500,
      color: { dark: background, light: color },
    });

    const logoUrl = new URL('/images/marketing-logo-simple.png', __URL__);
    const response = await fetch(logoUrl);
    const convertedBuffer = Buffer.from(await response.arrayBuffer()).toString('base64');
    const logoBase64Url = `data:image/png;base64,${convertedBuffer}`;

    const qrImage = new Image();
    qrImage.src = qrCodeDataUrl;
    await new Promise((resolve) => {
      qrImage.onload = resolve;
    });

    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    canvas.width = qrImage.width;
    canvas.height = qrImage.height;

    // Function to draw a rounded rectangle
    const drawRoundedRect = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
    };

    // Draw the rounded rectangle as a background for the QR code
    ctx.fillStyle = background;
    drawRoundedRect(ctx, 0, 0, canvas.width, canvas.height, 16);
    ctx.clip();
    ctx.drawImage(qrImage, 0, 0);

    // Load the logo image
    const logoImage = new Image();
    logoImage.src = logoBase64Url;
    await new Promise((resolve) => {
      logoImage.onload = resolve;
    });

    // Calculate the position and size for the logo
    const logoSize = canvas.width / 4.5;
    const logoX = (canvas.width - logoSize) / 2;
    const logoY = (canvas.height - logoSize) / 2;
    // Draw the logo in the center of the QR code
    ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);

    return canvas.toDataURL('image/png');
  }, []);

  useEffect(() => {
    const generate = async () => {
      const code = await generateQRCode();
      if (code) setEncodedQR(code);
    };
    generate();
  }, [urlToEncode, generateQRCode]);

  return { setBaseUrl, generateQRCode, encodedQR };
};
