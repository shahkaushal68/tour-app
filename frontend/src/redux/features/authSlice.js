import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  user: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ formValue, toast, navigate }, { rejectWithValue }) => {
    //console.log("userData", formValue);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/signin`,
        {
          email: formValue.email,
          password: formValue.password,
        }
      );
      toast.success("Login Successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ formValue, toast, navigate }, { rejectWithValue }) => {
    //console.log("userData", formValue);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/signup`,
        {
          userName: formValue.userName,
          email: formValue.email,
          password: formValue.password,
        }
      );
      toast.success("Register Successfully");
      navigate("/login");
      return response.data;
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.user = null;
      state.message = "";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      state.message = action.payload;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.user = null;
      state.message = "";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      state.message = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
//export const { increment, decrement, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
