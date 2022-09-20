import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux/es/exports";

const INITIAL_STATE = {
  led_state: false,
  fan_state: false,
  water_state: false,
  camera_state: false,
  storecommand_state: false,
  loading: false,
  error: "",
};

const storeCommandLink = "*****";

export const storeCommand = createAsyncThunk(
  "command/storeCommand",
  (commands) => {
    return axios.post(storeCommandLink, {
      light: commands.led_state,
      pump: commands.water_state,
      camera: commands.camera_state,
      fans: commands.fan_state,
    });
  }
);

const commandSlice = createSlice({
  name: "command",
  initialState: INITIAL_STATE,
  reducers: {
    led_toggle: (state) => {
      state.led_state = !state.led_state;
      state.storecommand_state = false;
    },
    fan_toggle: (state) => {
      state.fan_state = !state.fan_state;
      state.storecommand_state = false;
    },
    water_toggle: (state) => {
      state.water_state = !state.water_state;
      state.storecommand_state = false;
    },
    camera_toggle: (state) => {
      state.camera_state = !state.camera_state;
      state.storecommand_state = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(storeCommand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(storeCommand.fulfilled, (state, action) => {
      state.loading = false;
      state.storecommand_state = true;
      state.error = "";
    });
    builder.addCase(storeCommand.rejected, (state, action) => {
      state.loading = false;
      state.storecommand_state = false;
      state.error = action.error;
    });
  },
});

export default commandSlice.reducer;
export const { led_toggle, fan_toggle, water_toggle, camera_toggle } =
  commandSlice.actions;
