import type { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface Media extends UploadFile<CloudinaryResponse['data']> {
  id?: string;
  version?: number;
}

export interface MediaDto
  extends Omit<UploadFile<CloudinaryResponse['data']>, 'uid'> {
  id?: string;
  version?: number;
}

export interface IUploadMedia {
  file: RcFile;
  fileID: string;
  tags: string;
  axiosRequestConfig: AxiosRequestConfig;
  name?: string;
  cloudinaryCloudName: string;
  cloudinaryUploadPreset: string;
}

export interface MediaInterface {
  uid?: UploadFile['uid'];
  name?: UploadFile['name'];
  percent?: UploadFile['percent'];
  status?: UploadFile['status'];
  size?: UploadFile['size'];
  type?: UploadFile['type'];
  version?: number;
  tags?: string[];
  tagId?: string;
}

export interface MediaRepositoryInterface {
  uploadMedia: (
    media: IUploadMedia,
  ) => Promise<AxiosResponse<CloudinaryResponse>>;
}

export interface CloudinaryResponse {
  data: CloudinaryData;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
}

export interface CloudinaryData {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags?: null[] | null;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  existing: boolean;
  original_filename: string;
}

export interface Headers {
  'cache-control': string;
  'content-type': string;
}

export interface Config {
  transitional: Transitional;
  transformRequest?: null[] | null;
  transformResponse?: null[] | null;
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Env;
  headers: Headers1;
  method: string;
  url: string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Env {
  FormData?: null;
}

export interface Headers1 {
  Accept: string;
}

export interface UploadFileExtended
  extends UploadFile<CloudinaryResponse['data']> {
  version?: number;
}

export type ChangeHandler = (
  info: UploadChangeParam<UploadFileExtended>,
) => void;
