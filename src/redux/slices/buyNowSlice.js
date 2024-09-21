import { createSlice } from "@reduxjs/toolkit";

const buyNowSlice = createSlice({
    name: "buynow",
    initialState: {
        buynow : {}
    },
    reducers: {
        updateBuyNow: (state, action) => {
            state.buynow = action.payload;
        },
        updateQuantity: (state, action) => {
            state.buynow.quantity = action.payload;
        },
    },
})

export const buyNow = buyNowSlice.reducer;
export const {updateBuyNow,updateQuantity}   = buyNowSlice.actions;