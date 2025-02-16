import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../models/post";
import {
  fetchCreatePost,
  fetchDeletePost,
  fetchEditPost,
  fetchGetMyPosts,
  fetchGetPostById,
  fetchGetPosts,
} from "./actions";

interface PostState {
  posts: IPost[];
  popularPosts: IPost[];
  myPosts: IPost[];
  currentPost: IPost | null;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: PostState = {
  posts: [],
  popularPosts: [],
  myPosts: [],
  currentPost: null,
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
      })

      .addCase(fetchGetMyPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGetMyPosts.fulfilled, (state, { payload }) => {
        state.myPosts = payload;
        state.isLoading = false;
      })
      .addCase(fetchGetMyPosts.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })

      .addCase(fetchGetPostById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGetPostById.fulfilled, (state, { payload }) => {
        state.currentPost = payload;
        state.isLoading = false;
      })
      .addCase(fetchGetPostById.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })

      .addCase(fetchEditPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEditPost.fulfilled, (state, { payload }) => {
        const index = state.myPosts.findIndex(
          (post) => post._id === payload._id
        );
        state.myPosts[index] = payload;
        state.isLoading = false;
      })
      .addCase(fetchEditPost.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })

      .addCase(fetchDeletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDeletePost.fulfilled, (state, { payload }) => {
        state.myPosts = state.posts.filter((post) => post._id !== payload);
        state.isLoading = false;
      })
      .addCase(fetchDeletePost.rejected, (state, action) => {
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
