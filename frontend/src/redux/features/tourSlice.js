import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
//console.log("toekn", user.token);

const initialState = {
  loading: false,
  error: false,
  tour: {},
  tours: [],
  userTours: [],
  message: "",
};

export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    console.log("tourslice", formData);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/tour`,
        formData,
        {
          headers: { Authorization: "Bearer " + user.token },
        }
      );
      console.log("response", response);
      toast.success("Tour added successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const viewAllTours = createAsyncThunk(
  "tour/getAllTours",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/tour`
      );
      return response.data;
    } catch (err) {
      //console.log("err", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTour.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.tours = [];
      state.tour = {};
      state.userTours = [];
    });
    builder.addCase(createTour.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.tours = action.payload;
    });
    builder.addCase(createTour.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.tours = [];
      state.message = action.payload;
    });

    builder.addCase(viewAllTours.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.tours = [];
      state.tour = {};
      state.userTours = [];
    });
    builder.addCase(viewAllTours.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.tours = action.payload;
    });
    builder.addCase(viewAllTours.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.tours = [];
      state.message = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
// const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default tourSlice.reducer;
