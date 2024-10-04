import MediaRepository from './media.repository';
import type { IUploadMedia } from './media.types';

const mediaRepository = new MediaRepository();

export const uploadMedia = async (media: IUploadMedia) => {
  return await mediaRepository.uploadMedia(media);
};

export const deleteMedia = async (id: string) => {
  return await mediaRepository.deleteMedia(id);
};

export const deleteMediaByTag = async (tag: string) => {
  return await mediaRepository.deleteMediaByTag(tag);
};
