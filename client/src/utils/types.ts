export interface IResponseError {
  error: string;
  message: string;
  statusCode: number;
  validation: {
    body: {
      source: string;
      keys: string[];
      message: string;
    };
  };
}

export interface IPostFormInput {
  text: string;
  title: string;
  picture: File | string;
}

export interface ICommentFormInput {
  text: string;
}

export interface IProfileFormInput {
  name: string;
  description: string;
  avatar: File | string;
}
