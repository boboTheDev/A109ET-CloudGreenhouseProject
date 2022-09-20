import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const frontendLink = "*****/api/get_db_log";

const INITIAL_STATE = {
  loading: false,
  data: {},
  error: "",
};

export const fetchDetail = createAsyncThunk("detail/fetchDetail", () => {
  return axios.get(frontendLink).then((response) => {
    console.log(response);
    const { temperature, soil_moisture, lighting, humidity, water_tank } =
      response.data.data;

    return { temperature, soil_moisture, lighting, humidity, water_tank };
  });
});

const detailSlice = createSlice({
  name: "detail",
  initialState: INITIAL_STATE,

  extraReducers: (builder) => {
    builder.addCase(fetchDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchDetail.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error;
    });
  },
});

export default detailSlice.reducer;
