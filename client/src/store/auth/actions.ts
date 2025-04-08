import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  changeEmail,
  changePassword,
  loginUser,
  logoutUser,
  registrationUser,
  resetPassword,
  sendResetPasswordCode,
} from '../../services/auth';
import {
  IAuthResponse,
  ICredentials,
  IEmailChange,
  IPasswordChange,
  IRegistration,
  IResetPassword,
} from '../../models/auth';
import axios, { AxiosError } from 'axios';
import { IResponseError } from '../../utils/types';

export const fetchRegistrationUser = createAsyncThunk<
  IAuthResponse,
  IRegistration,
  {
    rejectValue: IResponseError;
  }
>(
  'user/registration',
  async (credentials: IRegistration, { rejectWithValue }) => {
    try {
      const res = await registrationUser(credentials);
      localStorage.setItem('token', res.data.accessToken);
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
>('user/login', async (credentials: ICredentials, { rejectWithValue }) => {
  try {
    const { data } = await loginUser(credentials);
    localStorage.setItem('token', data.accessToken);
    return data;
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchChangeEmail = createAsyncThunk<
  IAuthResponse,
  IEmailChange,
  {
    rejectValue: IResponseError;
  }
>(
  'user/changeEmail',
  async (credentials: IEmailChange, { rejectWithValue }) => {
    try {
      const { data } = await changeEmail(credentials);
      localStorage.setItem('token', data.accessToken);
      return data;
    } catch (err) {
      const error = err as AxiosError<IResponseError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchChangePassword = createAsyncThunk<
  IAuthResponse,
  IPasswordChange,
  {
    rejectValue: IResponseError;
  }
>(
  'user/changePassword',
  async (credentials: IPasswordChange, { rejectWithValue }) => {
    try {
      const { data } = await changePassword(credentials);
      localStorage.setItem('token', data.accessToken);
      return data;
    } catch (err) {
      const error = err as AxiosError<IResponseError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSendResetPasswordCode = createAsyncThunk<
  IAuthResponse,
  Pick<ICredentials, 'email'>,
  {
    rejectValue: IResponseError;
  }
>('user/resetPassword', async (email, { rejectWithValue }) => {
  try {
    const { data } = await sendResetPasswordCode(email);
    localStorage.setItem('token', data.accessToken);
    return data;
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchResetPassword = createAsyncThunk<
  IAuthResponse,
  IResetPassword,
  {
    rejectValue: IResponseError;
  }
>(
  'user/resetPassword',
  async (credentials: IResetPassword, { rejectWithValue }) => {
    try {
      const { data } = await resetPassword(credentials);
      localStorage.setItem('token', data.accessToken);
      return data;
    } catch (err) {
      const error = err as AxiosError<IResponseError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCheckAuth = createAsyncThunk<
  IAuthResponse,
  undefined,
  {
    rejectValue: IResponseError;
  }
>('user/refresh', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<IAuthResponse>(
      `${import.meta.env.VITE_URL}/api/refresh`,
      {
        withCredentials: true,
      }
    );
    localStorage.setItem('token', data.accessToken);
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
>('user/logout', async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem('token');
    await logoutUser();
  } catch (err) {
    const error = err as AxiosError<IResponseError>;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});
