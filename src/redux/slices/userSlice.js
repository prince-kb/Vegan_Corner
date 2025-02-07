import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../../lib/config";

const API = config.server;
const SERVER_SECRET = config.serverSecret;
const token = localStorage.getItem("authy");


export const updateUser = createAsyncThunk("updateUser", async () => {
  if (!token) return null;
  const response = await fetch(`${API}/api/user/getuser`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      secret: SERVER_SECRET,
      authToken: token,
    },
  });
  const data = await response.json();
  if(data) return data;
  return null;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      status : "PENDING"
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending),(state)=>{
      state.user.status = "PENDING"
    }
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(updateUser.rejected,(state)=>{
      state.user = null
    })
  },
});
export const { setUser } = userSlice.actions;
export const user = userSlice.reducer;
