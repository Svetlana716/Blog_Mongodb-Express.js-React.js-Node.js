import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../models/post";
import { fetchCreatePost, fetchGetPosts } from "./actions";

interface PostState {
  posts: IPost[];
  popularPosts: IPost[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: PostState = {
  posts: [],
  popularPosts: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    /* changesFavour(state) {
      state.isFavour = !state.isFavour;
  },

  addFavour(state, { payload }) {
      if (state.likes.includes(payload)) {
          state.likes = state.likes.filter(id => id !== payload);
          return;
      }
      state.likes.push(payload);
  }, */
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCreatePost.fulfilled, (state, { payload }) => {
        state.posts.push(payload);
        state.isLoading = false;
      })
      .addCase(fetchCreatePost.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })

      .addCase(fetchGetPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGetPosts.fulfilled, (state, { payload }) => {
        state.posts = payload.posts;
        state.popularPosts = payload.popularPosts;
        state.isLoading = false;
      })
      .addCase(fetchGetPosts.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const postsReducer = postsSlice.reducer;
