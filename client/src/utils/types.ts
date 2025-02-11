export interface IResponseError {
  message: string;
  errors: string[];
}

export interface IPostFormInput {
  text: string;
  title: string;
  picture: File | string;
}
