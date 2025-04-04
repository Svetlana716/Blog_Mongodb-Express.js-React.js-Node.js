import { AxiosResponse } from 'axios';
import api from '../utils/api';
import {
  IAuthResponse,
  ICredentials,
  IEmailChange,
  IPasswordChange,
  IRegistration,
  IResetPassword,
} from '../models/auth';

export const registrationUser = async (
  credentials: IRegistration
): Promise<AxiosResponse<IAuthResponse>> => {
  return await api.post<IAuthResponse>('/register', credentials);
};

export const loginUser = async (
  credentials: ICredentials
): Promise<AxiosResponse<IAuthResponse>> => {
  return await api.post<IAuthResponse>('/login', credentials);
};

export const changeEmail = async (
  credentials: IEmailChange
): Promise<AxiosResponse<IAuthResponse>> => {
  return await api.patch<IAuthResponse>('/email', credentials);
};

export const changePassword = async (
  credentials: IPasswordChange
): Promise<AxiosResponse<IAuthResponse>> => {
  return await api.patch<IAuthResponse>('/password', credentials);
};

export const logoutUser = async (): Promise<void> => {
  return await api.post('/logout');
};

export const sendResetPasswordCode = async (
  email: Pick<ICredentials, 'email'>
): Promise<AxiosResponse<IAuthResponse>> => {
  return await api.post<IAuthResponse>('/password-reset', email);
};

export const resetPassword = async (
  credentials: IResetPassword
): Promise<AxiosResponse<IAuthResponse>> => {
  return await api.post<IAuthResponse>('/password-reset/set-new', credentials);
};
