import { v4 as uuidv4 } from 'uuid';
import type { MediaInterface } from './media.types';

export class MediaEntity implements Partial<MediaInterface> {
  uid: MediaInterface['uid'];
  name?: MediaInterface['name'];
  size?: MediaInterface['size'];
  type?: MediaInterface['type'];
  version?: number;
  tagId?: string;
  status?: MediaInterface['status'];
  percent?: MediaInterface['percent'];

  constructor(value?: Partial<MediaInterface | undefined>) {
    this.uid = value?.uid || uuidv4();
    this.name = value?.name;
    this.size = value?.size;
    this.type = value?.type;
    this.version = value?.version;

    this.percent = value?.percent || 100;
    this.status = value?.status || 'done';
  }
}
