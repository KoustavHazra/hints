import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    loading: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setUserName: (state, action) => {
            state.userData.name = action.payload;
        }
    }
});

export const { login, logout, setLoading, setUserName } = authSlice.actions;

export default authSlice.reducer;