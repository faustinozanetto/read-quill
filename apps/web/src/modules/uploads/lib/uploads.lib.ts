import { supabase } from '@modules/supabase/lib/supabase.lib';
import mime from 'mime';
import sharp from 'sharp';
import { FileDeleteResult, FileUploadResult } from '../types/uploads.types';
import { join } from 'path';

export const convertFileToWebp = async (file: Blob): Promise<Blob> => {
  const processedFile = await sharp(await file.arrayBuffer())
    .webp()
    .toBuffer();
  const processedBlob = new Blob([processedFile], { type: 'image/webp' });
  return processedBlob;
};

export const uploadImageToSupabase = async (
  bucket: string,
  filePath: string,
  suffix: string,
  blob: Blob
): Promise<FileUploadResult> => {
  const uniqueSuffix = `${Date.now()}-${suffix}`;
  const fileName = `${uniqueSuffix}.${mime.getExtension(blob.type)}`;

  const completePath = `${filePath}/${fileName}`;

  const result = await supabase.storage.from(bucket).upload(completePath, blob, {
    cacheControl: '3600',
    upsert: false,
  });

  return result;
};

export const deleteImageFromSupabase = async (bucket: string, filePath: string): Promise<FileDeleteResult> => {
  const result = await supabase.storage.from(bucket).remove([filePath]);

  return result;
};

export const deleteImagesFromSupabase = async (bucket: string, filePaths: string[]): Promise<FileDeleteResult> => {
  const result = await supabase.storage.from(bucket).remove(filePaths);

  return result;
};
