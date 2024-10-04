import { notification } from 'antd';
import type { RcFile, UploadFile } from 'antd/lib/upload';
import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { deleteMedia } from '../media.actions';
import type { ChangeHandler } from '../media.types';
import isValidFileSize from '../validators/is-valid-media-size';
import { FileTypes } from '../validators/is-valid-media-type';
import isValidFileType from '../validators/is-valid-media-type';

const validateFile = (file: RcFile) => {
  const maxSize = 10; // MB
  const allowedTypes = [FileTypes.JPEG, FileTypes.PNG];

  if (!isValidFileSize(file, maxSize)) {
    notification.error({ message: 'La imagen debe tener menos de 10 MB' });
    return false;
  }

  if (!isValidFileType(file, allowedTypes)) {
    notification.error({ message: '¡Solo puede cargar un archivo JPG/PNG!' });
    return false;
  }

  return true;
};

export const useMedia = () => {
  const [mediaList, setMediaList] = useState<UploadFile[]>([]);

  const onRemoveMedia = useCallback((file: UploadFile) => {
    setMediaList((prevList) =>
      prevList.filter((item) => item.uid !== file.uid),
    );
    if (file.uid) {
      deleteMedia(file.uid);
    }
  }, []);

  const onChangesMedia = useCallback<ChangeHandler>(({ fileList }) => {
    const validFiles = fileList
      .filter((f) => validateFile(f as RcFile))
      .map((media) => {
        return {
          uid: media.uid,
          name: media.name,
          size: media.size,
          type: media.type,
          version: media.version || media.response?.version,
          percent: media.percent,
          status: media.status,
        };
      });
    setMediaList(validFiles);
  }, []);

  const beforeUploadMedia = useCallback((file: RcFile) => {
    if (!validateFile(file)) {
      return false;
    }

    file.uid = uuidv4();
    setMediaList((prevList) => [...prevList, file]);
    return true;
  }, []);

  return {
    mediaList,
    onRemoveMedia,
    onChangesMedia,
    beforeUploadMedia,
  };
};
