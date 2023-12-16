import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister, getCurrentUser } from "./authActions";

const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
const mobileNumber = localStorage.getItem("mobileNumber") ? localStorage.getItem("mobileNumber") : null;

const initialState = {
    loading: false,
    user: mobileNumber,
    token: token,
    error: null
}

export const userLogout = (state) => {
    localStorage.removeItem("token");
    localStorage.removeItem("mobileNumber");
    state.user = null;
    state.token = null;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducer: {
        userLogout
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.mobileNumber;
            state.token = payload.token;
        });
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
        // REGISTER user
        builder.addCase(userRegister.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(userRegister.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
        });
        builder.addCase(userRegister.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
        // CURRENT user
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.user;
        });
        builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
    }
})


export default authSlice;