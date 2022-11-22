import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
//console.log("token", user.token);

const initialState = {
  loading: false,
  error: false,
  singleTour: {},
  tours: [],
  userTours: [],
  message: "",
};

export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    //console.log("tourslice", formData);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/tour`,
        formData,
        {
          headers: { Authorization: "Bearer " + user.token },
        }
      );
      //console.log("response", response);
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

export const viewSingleTour = createAsyncThunk(
  "tour/viewSingleTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/tour/${id}`
      );
      return response.data;
    } catch (err) {
      //console.log("err", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserTours = createAsyncThunk(
  "tour/getUserTours",
  async (userId, { rejectWithValue }) => {
    //console.log("getUserTours", user.token);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/tour/userTours/${userId}`,
        {
          headers: { Authorization: "Bearer " + user.token },
        }
      );
      //console.log("response", response);
      return response.data;
    } catch (err) {
      console.log("err", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/tour/${id}`
      );
      toast.success("Tour delte successfully");
      return response.data;
    } catch (err) {
      console.log("tour delete err", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, formData, navigate, toast }, { rejectWithValue }) => {
    //console.log("tourslice", formData);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/tour/updateTour/${id}`,
        formData,
        {
          headers: { Authorization: "Bearer " + user.token },
        }
      );
      //console.log("response", response);
      toast.success("Tour Updated successfully");
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchTours = createAsyncThunk(
  "tour/searchTours",
  async (searchTour, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/tour/search?searchQuery=${searchTour}`
      );
      return response.data;
    } catch (err) {
      console.log("tour Search err", err);
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
      state.singleTour = {};
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
      state.singleTour = {};
      state.userTours = [];
    });
    builder.addCase(viewAllTours.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.tours = action.payload;
      state.message = "";
    });
    builder.addCase(viewAllTours.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.tours = [];
      state.message = action.payload;
    });

    builder.addCase(viewSingleTour.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.tours = [];
      state.singleTour = {};
      state.userTours = [];
    });
    builder.addCase(viewSingleTour.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.singleTour = action.payload;
    });
    builder.addCase(viewSingleTour.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.singleTour = [];
      state.message = action.payload;
    });

    builder.addCase(getUserTours.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.tours = [];
      state.singleTour = {};
      state.userTours = [];
    });
    builder.addCase(getUserTours.fulfilled, (state, action) => {
      //console.log("payload", action.payload);
      state.loading = false;
      state.error = false;
      state.userTours = action.payload;
    });
    builder.addCase(getUserTours.rejected, (state, action) => {
      //console.log("state", action);
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });

    builder.addCase(deleteTour.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(deleteTour.fulfilled, (state, action) => {
      //console.log(action);
      state.loading = false;
      state.error = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.filter((item) => item._id !== id);
        state.tours = state.tours.filter((item) => item._id !== id);
      }
    });
    builder.addCase(deleteTour.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });

    builder.addCase(updateTour.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateTour.fulfilled, (state, action) => {
      //console.log(action);
      state.loading = false;
      state.error = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.map((item) =>
          item._id === id ? action.payload : item
        );
        state.tours = state.tours.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    });
    builder.addCase(updateTour.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
      console.log(action.payload);
    });

    builder.addCase(searchTours.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.tours = [];
      state.singleTour = {};
      state.userTours = [];
    });
    builder.addCase(searchTours.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.tours = action.payload;
      state.message = "";
    });
    builder.addCase(searchTours.rejected, (state, action) => {
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
