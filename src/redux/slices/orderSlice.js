import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: {
            orderList : [],
            method : "",
            transactionId : "",
            deliveryCharges : 0,
            totalPrice : 0
        },
    },
    reducers : {
        updateOrderList : (state, action) => {
            state.order.orderList = action.payload;
        },
        updateTotalPrice : (state, action) => {
            if(action.payload < 349){
                state.order.deliveryCharges = 49;
                state.order.totalPrice = (action.payload+49);
            } else state.order.totalPrice = action.payload;
        },
        updateMethod : (state, action) => {
            state.order.method = action.payload;
        },
        updateTransactionId : (state, action) => {
            state.order.transactionId = action.payload;
        }
    }
})

export const order = orderSlice.reducer;
export const {updateDeliveryCharge,updateMethod,updateOrderList,updateTotalPrice,updateTransactionId} = orderSlice.actions;