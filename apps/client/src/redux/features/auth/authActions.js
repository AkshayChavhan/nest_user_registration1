import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
    "auth/login",
    async ({ mobileNumber, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post("/auth/login", { mobileNumber, password });
            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("mobileNumber", data.mobileNumber)
                window.location.replace("/");
            }
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

//register
export const userRegister = createAsyncThunk(
    "auth/signup",
    async (
        {
            firstName,
            lastName,
            mobileNumber,
            password
        },
        { rejectWithValue }
    ) => {
        try {
            const { data } = await API.post("/auth/signup", {
                firstName,
                lastName,
                mobileNumber,
                password
            });
            if (data?.token) {
                alert("User Registerd Successfully");
                window.location.replace("/login");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                alert(error);
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);


//current user
export const getCurrentUser = createAsyncThunk(
    "auth/profile",
    async (
        mobileNumber
    , { rejectWithValue }) => {
        try {
            const res = await API.get('/auth/profile', { params: { mobileNumber } });
            if (res.data) {
                return res?.data;
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);