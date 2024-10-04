import axios, { type AxiosResponse } from 'axios';
import type {
  CloudinaryResponse,
  IUploadMedia,
  MediaRepositoryInterface,
} from './media.types';

export default class MediaRepository implements MediaRepositoryInterface {
  async uploadMedia({
    file,
    fileID,
    tags,
    axiosRequestConfig,
    cloudinaryCloudName,
    cloudinaryUploadPreset,
  }: IUploadMedia): Promise<AxiosResponse<CloudinaryResponse>> {
    const formData = new FormData();

    formData.append('file', file);

    formData.append('upload_preset', `${cloudinaryUploadPreset}`);

    formData.append('public_id', fileID);

    formData.append('tags', tags);

    const response = await axios.post<CloudinaryResponse>(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
      formData,
      axiosRequestConfig,
    );

    return response;
  }

  // TODO: add support for a list of ID
  //
  // /api/delete-resources?resources=a,b,c
  //
  async deleteMedia(id: string) {
    const response = await axios.delete('/api/cloudinary/delete-resources', {
      params: {
        resources: id,
      },
    });

    return response;
  }

  async deleteMediaByTag(tag: string) {
    const response = await axios.delete(
      '/api/cloudinary/delete-resources-by-tag',
      {
        params: {
          tag,
        },
      },
    );

    return response;
  }
}
