import { AxiosResponse } from "axios";
import { IPost, IPosts } from "../models/post";
import api from "../utils/api";

export const createPost = async (
  formData: FormData
): Promise<AxiosResponse<IPost>> => {
  return await api.post<IPost>("/posts", formData);
};

export const getAllPosts = async (): Promise<AxiosResponse<IPosts>> => {
  return await api.get<IPosts>("/posts");
};
