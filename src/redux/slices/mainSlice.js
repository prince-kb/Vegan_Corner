import { createSlice } from "@reduxjs/toolkit";
import Products from "../store/Products.json";
const mainSlice = createSlice({
  name: "main",
  initialState: {
    Products,
  },
  reducers: {
    updateMain: (state, action) => {
      state.Products = action.payload;
    },
  },
});
export const { updateMain } = mainSlice.actions;
export const main = mainSlice.reducer;

// Should be used when we want to get the Catalogue from the store instead of calling Catalogue.main.Catalogue and use some different value instead of same, as it will give unwanted re-render
// export const getCatalogue = createSelector(
//   (state) => state.main.Catalogue,
//   (catalogue) => catalogue
// );

