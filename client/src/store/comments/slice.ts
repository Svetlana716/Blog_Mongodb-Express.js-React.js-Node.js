import { createSlice } from "@reduxjs/toolkit";
import { IComment } from "../../models/comment";
import { fetchCreateComment, fetchGetComments } from "./actions";

interface CommentsState {
  comments: IComment[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
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
      .addCase(fetchCreateComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCreateComment.fulfilled, (state, { payload }) => {
        state.comments.push(payload);
        state.isLoading = false;
      })
      .addCase(fetchCreateComment.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })

      .addCase(fetchGetComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGetComments.fulfilled, (state, { payload }) => {
        state.comments = payload;
        state.isLoading = false;
      })
      .addCase(fetchGetComments.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
