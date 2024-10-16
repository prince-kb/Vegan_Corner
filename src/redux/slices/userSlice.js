import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateUser = createAsyncThunk("updateUser", async () => {
  const API = import.meta.env.VITE_REACT_APP_API;
  const SERVER_SECRET = import.meta.env.VITE_REACT_APP_SERVER_SECRET;
  const token = localStorage.getItem("authy");
  if (!token) return;
  const response = await fetch(`${API}/api/user/getuser`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      secret: SERVER_SECRET,
      authToken: token,
    },
  });
  const data = await response.json();
  return data;
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
