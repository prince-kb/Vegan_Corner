import { createSlice } from "@reduxjs/toolkit";
import Catalogue from "../store/Catalogue.json";

const catalogueSlice = createSlice({
    name: "catalogue",
    initialState: {
        Catalogue
    },
    reducers: {
        updateCatalogue: (state, action) => {
        state.Catalogue = action.payload;
        },
    },
})

export const catalogue = catalogueSlice.reducer;
export const {updateCatalogue} = catalogueSlice.actions;