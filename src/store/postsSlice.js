// postsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            // state.posts = action.payload.posts;
            return {
                ...state,
                posts: action.payload.posts,
            };
        },
    },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
