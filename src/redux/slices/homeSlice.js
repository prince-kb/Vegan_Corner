import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        home: ''
    },
    reducers: {
        updateHome: (state, action) => {
            state.home = action.payload;
        }
    },
})

export const home = homeSlice.reducer;
export const {updateHome} = homeSlice.actions;