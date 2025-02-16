import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { usersReducer } from "./users/slice";
import { postsReducer } from "./posts/slice";
import { commentsReducer } from "./comments/slice";

const reducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
