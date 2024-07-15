import { createSelector, createSlice } from "@reduxjs/toolkit";
import Catalogue from "../store/Catalogue.json";
const mainSlice = createSlice({
  name: "main",
  initialState: {
    Catalogue,
  },
  reducers: {
    updateMain: (state, action) => {
      state.Catalogue = action.payload;
    },
  },
});
export const { updateMain } = mainSlice.actions;
export const main = mainSlice.reducer;

// Should be used when we want to get the Catalogue from the store instead of calling Catalogue.main.Catalogue
// export const getCatalogue = createSelector(
//   (state) => state.main.Catalogue,
//   (catalogue) => catalogue
// );
