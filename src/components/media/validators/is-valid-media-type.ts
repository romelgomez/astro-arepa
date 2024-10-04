import type { RcFile } from 'antd/lib/upload';

export enum FileTypes {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
}

export default function isTypeValid(
  file: RcFile,
  type: string | string[],
): boolean {
  if (typeof type === 'string') {
    return file.type === type;
  }

  return type.includes(file.type);
}
