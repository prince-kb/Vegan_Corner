import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = import.meta.env.VITE_REACT_APP_API;
const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET;
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
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
export const { setUser } = userSlice.actions;
export const user = userSlice.reducer;
