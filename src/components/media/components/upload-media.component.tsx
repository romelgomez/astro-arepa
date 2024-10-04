import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { useCallback, useState } from 'react';
import { deleteMedia } from '../media.actions';
import type { ChangeHandler, Media, UploadFileExtended } from '../media.types';
import useHandleCustomUpload from './../hooks/use-handle-custom-upload.hook';
import PreviewMedia from './preview-media.component';

interface UploadMediaProps {
  cloudinaryUploadPreset: string;
  cloudinaryCloudName: string;

  tagId: string;
  onRemove: (file: UploadFile) => void;
  onChanges: ChangeHandler;
  beforeUpload: (file: RcFile) => boolean;
  media: Media[];
}

export default function UploadMedia({
  tagId,
  onRemove,
  onChanges,
  media,
  beforeUpload,
  cloudinaryCloudName,
  cloudinaryUploadPreset,
}: UploadMediaProps) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handlePreview = async (media: UploadFileExtended) => {
    setPreviewImage(
      `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/b_auto,c_lpad,h_540,w_800/v${media.version}/${media.uid}.jpg`,
    );
    setPreviewVisible(true);
    setPreviewTitle(media.name);
  };

  const handleCustomUpload = useHandleCustomUpload(
    cloudinaryCloudName,
    cloudinaryUploadPreset,
    tagId,
  );

  const handleRemove = useCallback(
    async (file: UploadFile) => {
      if (file.uid) {
        // delete from cloudinary
        deleteMedia(file.uid);
      }

      onRemove(file);
    },
    [onRemove],
  );

  return (
    <>
      <Upload
        customRequest={handleCustomUpload}
        listType='picture-card'
        fileList={media?.map((media) => {
          if (media.version && media.uid) {
            return {
              ...media,
              thumbUrl: `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/b_auto,c_lpad,h_84,w_84/v${media.version}/${media.uid}.jpg`,
            };
          }

          return {
            ...media,
          };
        })}
        onPreview={handlePreview}
        onChange={onChanges}
        beforeUpload={beforeUpload}
        onRemove={handleRemove}
        multiple={true}
        progress={{
          strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
          },
          size: 3,
          format: (percent) =>
            percent && `${Number.parseFloat(percent.toFixed(2))}%`,
        }}
      >
        {media && media.length >= 8 ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
      {previewImage && (
        <PreviewMedia
          src={previewImage}
          preview={{
            title: previewTitle,
            visible: previewVisible,
            src: previewImage,
            onVisibleChange: (value) => {
              setPreviewVisible(value);
            },
          }}
        />
      )}
    </>
  );
}
