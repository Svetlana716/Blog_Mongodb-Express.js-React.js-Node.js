import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registrationUser } from "../../services/auth";
import { IAuthResponse, ICredentials, IRegistration } from "../../models/auth";
import axios, { AxiosError } from "axios";
import { URL } from "../../utils/constants";
import { IResponseError } from "../../utils/types";

export const fetchRegistrationUser = createAsyncThunk<
  IAuthResponse,
  IRegistration,
  {
    rejectValue: IResponseError;
  }
>(
  "user/registration",
  async (credentials: IRegistration, { rejectWithValue }) => {
    try {
      const res = await registrationUser(credentials);
      localStorage.setItem("token", res.data.accessToken);
      return res.data;
    } catch (err) {
      const error = err as AxiosError<IResponseError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLoginUser = createAsyncThunk<
  IAuthResponse,
  ICredentials,
  {
    rejectValue: IResponseError;
  }
>("user/login", async (credentials: ICredentials, { rejectWithValue }) => {
  try {
    const { data } = await loginUser(credentials);
    localStorage.setItem("token", data.accessToken);
    return data;
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchLogoutUser = createAsyncThunk<
  void,
  undefined,
  {
    rejectValue: IResponseError;
  }
>("user/logout", async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem("token");
    await logoutUser();
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchCheckAuth = createAsyncThunk<
  IAuthResponse,
  undefined,
  {
    rejectValue: IResponseError;
  }
>("user/refresh", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<IAuthResponse>(`${URL}/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem("token", data.accessToken);
    return data;
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});
