import type { RcFile } from 'antd/es/upload';
import type { AxiosRequestConfig } from 'axios';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { useCallback } from 'react';
import { uploadMedia } from '../media.actions';

export default function useHandleCustomUpload(
  cloudinaryCloudName: string,
  cloudinaryUploadPreset: string,
  tagId?: string,
) {
  return useCallback(
    async ({
      file,
      filename,
      onError,
      onProgress,
      onSuccess,
    }: UploadRequestOption) => {
      const config: AxiosRequestConfig = {
        onUploadProgress: (progressEvent) => {
          const percent = progressEvent.total
            ? (progressEvent.loaded / progressEvent.total) * 100
            : 0;

          onProgress?.({
            percent,
          });
        },
      };

      try {
        if (!tagId) {
          throw new Error('Tag ID is missing.');
        }

        const _file = file as RcFile;

        const response = await uploadMedia({
          file: _file,
          name: filename,
          fileID: _file.uid,
          tags: tagId,
          axiosRequestConfig: config,
          cloudinaryCloudName,
          cloudinaryUploadPreset,
        });

        onSuccess?.({
          ...response.data,
        });

        return {
          abort() {
            console.error('upload progress is aborted.');
          },
        };
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error);
          onError?.(error);
        } else {
          console.error(error);
        }
      }
    },
    [cloudinaryCloudName, cloudinaryUploadPreset, tagId],
  );
}
