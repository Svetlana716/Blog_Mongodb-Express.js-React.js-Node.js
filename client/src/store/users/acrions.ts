import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../models/user";
import { IResponseError } from "../../utils/types";
import { getUsers } from "../../services/users";
import { AxiosError } from "axios";

export const fetchGetAllUsers = createAsyncThunk<
  IUser[],
  undefined,
  {
    rejectValue: IResponseError;
  }
>("user/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await getUsers();
    return res.data;
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});
