import { Image, type ImageProps } from 'antd';
import styles from './../media.module.scss';

interface ImageUploaderProps {
  src: ImageProps['src'];
  preview: ImageProps['preview'];
}

export default function PreviewMedia({ src, preview }: ImageUploaderProps) {
  return (
    <Image
      alt=''
      width={1}
      height={1}
      src={src}
      className={styles.previewImage}
      preview={preview}
    />
  );
}
