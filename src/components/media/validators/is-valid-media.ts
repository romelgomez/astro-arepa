import type { RcFile } from 'antd/es/upload';
import isValidFileSize from './is-valid-media-size';
import isValidFileType from './is-valid-media-type';

export default function isValidFile(
  file: RcFile,
  size: number,
  type: string | string[],
): boolean {
  // First, check the file size.
  if (!isValidFileSize(file, size)) {
    return false;
  }

  // If only one type is provided, check against that type.
  if (typeof type === 'string') {
    return isValidFileType(file, type);
  }

  // If multiple types are provided, check if the file matches any of them.
  return type.some((t) => isValidFileType(file, t));
}
