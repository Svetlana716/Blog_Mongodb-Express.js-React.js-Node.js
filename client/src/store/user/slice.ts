import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/user";

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
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {},
});
