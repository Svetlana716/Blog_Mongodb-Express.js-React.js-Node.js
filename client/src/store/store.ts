import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { usersReducer } from "./user/slice";
import { postsReducer } from "./posts/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
