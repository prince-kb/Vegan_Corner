import { configureStore } from "@reduxjs/toolkit";
import { main } from "../slices/mainSlice";
import { catalogue } from "../slices/catalogueSlice";
import { user } from "../slices/userSlice";
import { notification } from "../slices/notificationSlice";
import { home } from "../slices/homeSlice";
import { buyNow } from "../slices/buyNowSlice";
import { order } from "../slices/orderSlice";

export const store = configureStore({
  reducer: {
    main: main,
    catalogue: catalogue,
    user: user,
    notification: notification,
    home: home,
    buyNow: buyNow,
    order: order,
  },
});
