import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICommentFormInput, IResponseError } from "../../utils/types";
import { AxiosError } from "axios";
import { IComment } from "../../models/comment";
import { createComment, getAllComments } from "../../services/comments";

export const fetchCreateComment = createAsyncThunk<
  IComment,
  { id: string | undefined; values: ICommentFormInput },
  {
    rejectValue: IResponseError;
  }
>("comments/create", async ({ id, values }, { rejectWithValue }) => {
  try {
    const res = await createComment(id, values);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchGetComments = createAsyncThunk<
  IComment[],
  string,
  {
    rejectValue: IResponseError;
  }
>("comments/getAll", async (id, { rejectWithValue }) => {
  try {
    const res = await getAllComments(id);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});
