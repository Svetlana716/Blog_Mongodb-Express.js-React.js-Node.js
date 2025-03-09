import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../models/user";
import { IResponseError } from "../../utils/types";
import { editMe, getMe } from "../../services/users";
import { AxiosError } from "axios";

export const fetchGetMe = createAsyncThunk<
  IUser,
  undefined,
  {
    rejectValue: IResponseError;
  }
>("user/getMe", async (_, { rejectWithValue }) => {
  try {
    const res = await getMe();
    return res.data;
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchEditMe = createAsyncThunk<
  IUser,
  FormData,
  {
    rejectValue: IResponseError;
  }
>("user/editMe", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await editMe(formData);
    return data;
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});
