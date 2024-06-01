import sharp from 'sharp';

const fetchImageFromUrl = async (imageUrl: string) => {
  const imageResponse = await fetch(imageUrl);
  return imageResponse;
};

const getImageBufferFromResponse = async (response: Response) => {
  const imageBuffer = Buffer.from(await response.arrayBuffer());
  return imageBuffer;
};

const generatePlaceholderBuffer = async (imageBuffer: Buffer, size = 6) => {
  const resizedBuffer = await sharp(imageBuffer).resize(size).toBuffer();
  return resizedBuffer;
};

const encodePlaceholderBuffer = (imageBuffer: Buffer) => {
  const base64PlaceholderBuffer = `data:image/png;base64,${imageBuffer.toString('base64')}`;
  return base64PlaceholderBuffer;
};

export const generatePlaceholderImage = async (imageUrl: string) => {
  const imageResponse = await fetchImageFromUrl(imageUrl);
  const imageBuffer = await getImageBufferFromResponse(imageResponse);
  const placeholderBuffer = await generatePlaceholderBuffer(imageBuffer);

  return encodePlaceholderBuffer(placeholderBuffer);
};
