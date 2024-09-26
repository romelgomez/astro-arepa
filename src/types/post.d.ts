export interface PostCreate {
  title: string;
  sub_title?: string;
  published: boolean;
  description: string;
}

export interface PostUpdate {
  id: string;
  title: string;
  sub_title?: string;
  published: boolean;
  description: string;
}

export interface PostResponse {
  id: string;
  title: string;
  sub_title?: string;
  published: boolean;
  description: string;
}
