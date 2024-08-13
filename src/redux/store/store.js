import { configureStore } from "@reduxjs/toolkit";
import { main } from "../slices/mainSlice";
import { catalogue } from "../slices/catalogueSlice";
import { user } from "../slices/userSlice";
import { notification } from "../slices/notificationSlice";

export const store = configureStore({
    reducer: {
        main : main,
        catalogue : catalogue,
        user : user,
        notification : notification
    }
});