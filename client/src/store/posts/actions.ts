import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPost, IPosts } from "../../models/post";
import { IResponseError } from "../../utils/types";
import { createPost, getAllPosts } from "../../services/post";
import { AxiosError } from "axios";

export const fetchCreatePost = createAsyncThunk<
  IPost,
  FormData,
  {
    rejectValue: IResponseError;
  }
>("posts/create", async (formData: FormData, { rejectWithValue }) => {
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
