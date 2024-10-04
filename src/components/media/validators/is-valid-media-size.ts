import type { RcFile } from 'antd/es/upload';

// Conversion factor from bytes to megabytes
const BYTES_TO_MB = 1024 * 1024;

export default function isValidFileSize(file: RcFile, size: number): boolean {
  // Convert file size to megabytes and check if it's less than the specified size
  return file.size / BYTES_TO_MB < size;
}
