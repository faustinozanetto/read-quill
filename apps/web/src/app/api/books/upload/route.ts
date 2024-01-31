import { join } from 'node:path';
import { stat, mkdir, writeFile } from 'node:fs/promises';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';
import mime from 'mime';
import type { BooksUploadPostResponse } from '@modules/api/types/books-api.types';

async function createDirectoryIfNotExists(directoryPath: string): Promise<void> {
  try {
    await stat(directoryPath);
  } catch (error: unknown) {
    if ((error as { code?: string }).code === 'ENOENT') {
      await mkdir(directoryPath, { recursive: true });
    } else {
      throw new Error('Something went wrong.');
    }
  }
}

async function handleFileUpload(file: Blob): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${format(Date.now(), 'dd-MM-y')}`;
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

  await createDirectoryIfNotExists(uploadDir);

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${uniqueSuffix}.${mime.getExtension(file.type)}`;

  await writeFile(`${uploadDir}/${filename}`, buffer);

  return `${relativeUploadDir}/${filename}`;
}

export async function POST(request: Request): Promise<NextResponse<BooksUploadPostResponse | { error: string }>> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob | null;

    if (!file) {
      return NextResponse.json({ error: 'File blob is required.' }, { status: 400 });
    }

    const fileUrl = await handleFileUpload(file);
    return NextResponse.json({ fileUrl });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
