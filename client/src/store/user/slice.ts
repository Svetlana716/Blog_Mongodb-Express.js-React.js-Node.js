import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/user";
import { fetchGetAllUsers } from "./acrions";

interface UserState {
  users: IUser[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGetAllUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.isLoading = false;
      })
      .addCase(fetchGetAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const usersReducer = userSlice.reducer;
