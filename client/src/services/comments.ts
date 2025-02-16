import { AxiosResponse } from "axios";
import api from "../utils/api";
import { IComment } from "../models/comment";
import { ICommentFormInput } from "../utils/types";

export const createComment = async (
  id: string | undefined,
  formData: ICommentFormInput
): Promise<AxiosResponse<IComment>> => {
  return await api.post<IComment>(`/comments/${id}`, formData);
};

export const getAllComments = async (
  id: string
): Promise<AxiosResponse<IComment[]>> => {
  return await api.get<IComment[]>(`/comments/${id}`);
};
