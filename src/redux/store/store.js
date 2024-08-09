import { configureStore } from "@reduxjs/toolkit";
import { main } from "../slices/mainSlice";
import { catalogue } from "../slices/catalogueSlice";
import { user } from "../slices/userSlice";

export const store = configureStore({
    reducer: {
        main : main,
        catalogue : catalogue,
        user : user
    }
});