import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/user";
import { fetchEditMe, fetchGetMe } from "./actions";

interface UserState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetMe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGetMe.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
      })
      .addCase(fetchGetMe.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.validation
            ? action.payload.validation.body.message
            : action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })

      .addCase(fetchEditMe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEditMe.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
      })
      .addCase(fetchEditMe.rejected, (state, action) => {
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

export const usersReducer = userSlice.reducer;
