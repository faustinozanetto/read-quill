/**
 * Extracts the attachment name from a File object by removing the file extension.
 * @param file The File object from which to extract the attachment name.
 * @returns The attachment name without the file extension.
 */
export const extractAttachmentNameFromFile = (file: File) => {
  const fileName = file.name;
  const extensionIndex = fileName.lastIndexOf('.');

  if (extensionIndex === -1) return fileName;

  return fileName.substring(0, extensionIndex);
};

/**
 * Extracts the attachment name from a URL by parsing the URL and removing the file extension.
 * @param url The URL from which to extract the attachment name.
 * @returns The attachment name without the file extension.
 */
export const extractAttachmentNameFromUrl = (url: string) => {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
  const extensionIndex = lastSegment.lastIndexOf('.');

  // If there's no extension, return the whole last segment
  if (extensionIndex === -1) return lastSegment;

  // Get the file name without the extension
  const fileNameWithTimestamp = lastSegment.substring(0, extensionIndex);

  // Find the index of the first hyphen after the timestamp
  const firstHyphenIndex = fileNameWithTimestamp.indexOf('-');

  // Return the part after the first hyphen
  return fileNameWithTimestamp.substring(firstHyphenIndex + 1);
};

export const extractAttachmentIdFromUrl = (url: string) => {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);

  return lastSegment;
};
