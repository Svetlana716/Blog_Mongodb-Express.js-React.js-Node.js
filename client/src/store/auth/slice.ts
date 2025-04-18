import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChangeEmail,
  fetchChangePassword,
  fetchCheckAuth,
  fetchLoginUser,
  fetchLogoutUser,
  fetchRegistrationUser,
} from "./actions";
import { IUser } from "../../models/user";

interface AuthState {
  user: IUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistrationUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRegistrationUser.fulfilled, (state, { payload }) => {
        state.user = payload!.user;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(fetchRegistrationUser.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.validation
            ? action.payload.validation.body.message
            : action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })

      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLoginUser.fulfilled, (state, { payload }) => {
        state.user = payload!.user;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.validation
            ? action.payload.validation.body.message
            : action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })

      .addCase(fetchChangeEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChangeEmail.fulfilled, (state, { payload }) => {
        state.user = payload!.user;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(fetchChangeEmail.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.validation
            ? action.payload.validation.body.message
            : action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })

      .addCase(fetchChangePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChangePassword.fulfilled, (state, { payload }) => {
        state.user = payload!.user;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(fetchChangePassword.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.validation
            ? action.payload.validation.body.message
            : action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })

      .addCase(fetchLogoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.isLoading = false;
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.validation
            ? action.payload.validation.body.message
            : action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })

      .addCase(fetchCheckAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCheckAuth.fulfilled, (state, { payload }) => {
        state.user = payload!.user;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(fetchCheckAuth.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.validation
            ? action.payload.validation.body.message
            : action.payload.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const authReducer = authSlice.reducer;
