import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  isSuccess: false,
};

export const HandleSignIn = createAsyncThunk(
  "auth/HandleSignIn",
  async (user, thunkAPI) => {
    try {
      const { email, password } = user;
      let response = await axios.post('/users/login', {
        email,
        password,
      });
      if (response.data) {
        localStorage.setItem("token", response.data.access_token);
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const HandleSignUP = createAsyncThunk(
  "auth/HandleSignUP",
  async (user, thunkAPI) => {
    try {
      const { email, password, password_confirmation, name } = user;
      let response = await axios.post('/users/create', {
        email,
        password,
        name,
        password_confirmation
      });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const HandleSignOut = createAsyncThunk(
  "auth/HandleSignOut",
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem("token");
      return {};
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: state => initialState,
    keepLoggedIn: state => {
      state.isLoggedIn = true;
    },
    loggedOut: state => {
      state.isLoggedIn = false;
    },
    setSuccess: state => {
      state.isSuccess = true;
    },
    resetSuccess: state => {
      state.isSuccess = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(HandleSignIn.fulfilled, state => {
        state.isLoggedIn = true;
        state.isSuccess = false; // Reset isSuccess on successful sign-in
      })
      .addCase(HandleSignIn.rejected, state => {
        state.isLoggedIn = false;
        state.isSuccess = false; // Reset isSuccess on failed sign-in
      })
      .addCase(HandleSignOut.fulfilled, state => {
        state.isLoggedIn = false;
        state.isSuccess = false; // Reset isSuccess on sign-out
      })
      .addCase(HandleSignUP.fulfilled, (state) => {
        state.isSuccess = true;
      })
      .addCase(HandleSignUP.rejected, (state) => {
        state.isSuccess = false;
      });
  },
});

export const { clearState, keepLoggedIn, loggedOut, setSuccess, resetSuccess } = authSlice.actions;
export default authSlice.reducer;
