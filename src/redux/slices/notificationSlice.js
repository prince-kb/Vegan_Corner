import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState:[],
    reducers: {
        setNotification: (state, action) => {
            state.push(action.payload);
        },
        deleteNotification: (state, action) => {
            state.shift();
        }
    },
});
export const { setNotification,deleteNotification } = notificationSlice.actions;
export const notification = notificationSlice.reducer;