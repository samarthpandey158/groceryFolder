import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import cartSlice from "./cartSlice"
export const store = configureStore({
    reducer:{
        userka : userSlice,
        cartka : cartSlice
    }
})


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']