import { supabase } from '@modules/supabase/lib/supabase.lib';
import mime from 'mime';
import sharp from 'sharp';
import { FileDeleteResult, FileUploadResult } from '../types/uploads.types';

export const convertFileToWebp = async (file: Blob): Promise<Blob> => {
  const processedFile = await sharp(await file.arrayBuffer())
    .webp()
    .toBuffer();
  const processedBlob = new Blob([processedFile], { type: 'image/webp' });
  return processedBlob;
};

export const uploadFileToSupabase = async (suffix: string, bucket: string, blob: Blob): Promise<FileUploadResult> => {
  const uniqueSuffix = `${Date.now()}-${suffix}`;
  const filename = `${uniqueSuffix}.${mime.getExtension(blob.type)}`;

  const result = await supabase.storage.from(bucket).upload(filename, blob, {
    cacheControl: '3600',
    upsert: false,
  });

  return result;
};

export const deleteFileFromSupabase = async (bucket: string, filePath: string): Promise<FileDeleteResult> => {
  const result = await supabase.storage.from(bucket).remove([filePath]);
  return result;
};
