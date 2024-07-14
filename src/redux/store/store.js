import { configureStore } from "@reduxjs/toolkit";
import { main } from "../slices/mainSlice";

export const store = configureStore({
    reducer: {
        main : main,
    },


});