import { extractAttachmentNameFromFile, extractAttachmentNameFromUrl } from '../thread-attachments.lib';

describe('extractAttachmentNameFromFile', () => {
  it('should extract attachment name without extension from a file with extension', () => {
    const file = { name: 'this-is-a-sample-file-with-extension.jpg' } as File;
    const result = extractAttachmentNameFromFile(file);
    expect(result).toEqual('this-is-a-sample-file-with-extension');
  });

  it('should return the entire file name if it has no extension', () => {
    const file = { name: 'this-is-a-sample-file-with-no-extension' } as File;
    const result = extractAttachmentNameFromFile(file);
    expect(result).toEqual('this-is-a-sample-file-with-no-extension');
  });
});

describe('extractAttachmentNameFromUrl', () => {
  it('should extract attachment name without extension from a URL with extension', () => {
    const url = 'https://example.com/images/image.jpg';
    const result = extractAttachmentNameFromUrl(url);
    expect(result).toEqual('image');
  });

  it('should return the entire last segment if the URL has no extension', () => {
    const url = 'https://example.com/images/image';
    const result = extractAttachmentNameFromUrl(url);
    expect(result).toEqual('image');
  });

  it('should handle URLs with timestamp and hyphen', () => {
    const url = 'https://example.com/images/20220418-image-1234.jpg';
    const result = extractAttachmentNameFromUrl(url);
    expect(result).toEqual('image-1234');
  });
});
