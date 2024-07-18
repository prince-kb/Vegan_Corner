import { configureStore } from "@reduxjs/toolkit";
import { main } from "../slices/mainSlice";
import { catalogue } from "../slices/catalogueSlice";

export const store = configureStore({
    reducer: {
        main : main,
        catalogue : catalogue
    },


});