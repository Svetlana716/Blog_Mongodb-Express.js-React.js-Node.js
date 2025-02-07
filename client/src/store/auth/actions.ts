import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registrationUser } from "../../services/auth";
import { IAuthError, IAuthResponse, ICredentials } from "../../models/auth";
import { AxiosError } from "axios";

export const fetchRegistrationUser = createAsyncThunk<
  IAuthResponse,
  ICredentials,
  {
    rejectValue: IAuthError;
  }
>(
  "user/registration",
  async (credentials: ICredentials, { rejectWithValue }) => {
    try {
      const res = await registrationUser(credentials);
      localStorage.setItem("token", res.data.accessToken);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<IAuthError>; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLoginUser = createAsyncThunk<
  IAuthResponse,
  ICredentials,
  {
    rejectValue: IAuthError;
  }
>("user/login", async (credentials: ICredentials, { rejectWithValue }) => {
  try {
    const { data } = await loginUser(credentials);
    localStorage.setItem("token", data.accessToken);
    return data;
  } catch (err) {
    const error = err as AxiosError<IAuthError>; // cast the error for access
    if (!error.response) {
      throw err;
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return rejectWithValue(error.response.data);
  }
});

export const fetchLogoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem("token");
      return await logoutUser();
    } catch (error) {
      thunkAPI.rejectWithValue(`Ошибка ${error}`);
    }
  }
);
