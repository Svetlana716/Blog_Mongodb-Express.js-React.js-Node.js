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

export const getPostById = async (
  id: string | undefined
): Promise<AxiosResponse<IPost>> => {
  return await api.get<IPost>(`/posts/${id}`);
};

export const getMyPosts = async (): Promise<AxiosResponse<IPost[]>> => {
  return await api.get<IPost[]>(`/posts/my`);
};

export const editPost = async (
  id: string | undefined,
  formData: FormData
): Promise<AxiosResponse<IPost>> => {
  return await api.put<IPost>(`/posts/${id}`, formData);
};

export const deleteMyPost = async (id: string | undefined): Promise<void> => {
  return await api.delete(`/posts/${id}`);
};
