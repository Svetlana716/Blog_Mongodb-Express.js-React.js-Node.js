import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPost, IPosts } from "../../models/post";
import { IResponseError } from "../../utils/types";
import {
  createPost,
  deleteMyPost,
  editPost,
  getAllPosts,
  getMyPosts,
  getPostById,
} from "../../services/posts";
import { AxiosError } from "axios";

export const fetchCreatePost = createAsyncThunk<
  IPost,
  FormData,
  {
    rejectValue: IResponseError;
  }
>("posts/create", async (formData, { rejectWithValue }) => {
  try {
    const res = await createPost(formData);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchGetPosts = createAsyncThunk<
  IPosts,
  undefined,
  {
    rejectValue: IResponseError;
  }
>("posts/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getAllPosts();
    return data;
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchGetMyPosts = createAsyncThunk<
  IPost[],
  undefined,
  {
    rejectValue: IResponseError;
  }
>("posts/getMy", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getMyPosts();
    return data;
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchGetPostById = createAsyncThunk<
  IPost,
  string | undefined,
  {
    rejectValue: IResponseError;
  }
>("posts/getOne", async (id, { rejectWithValue }) => {
  try {
    const { data } = await getPostById(id);
    return data;
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchEditPost = createAsyncThunk<
  IPost,
  { id: string | undefined; formData: FormData },
  {
    rejectValue: IResponseError;
  }
>("posts/edit", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const { data } = await editPost(id, formData);
    return data;
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchDeletePost = createAsyncThunk<
  unknown,
  string | undefined,
  {
    rejectValue: IResponseError;
  }
>("posts/delete", async (id, { rejectWithValue }) => {
  try {
    await deleteMyPost(id);
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});
