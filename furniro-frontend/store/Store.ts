import { configureStore } from "@reduxjs/toolkit";
import shoppingReducer from './Products'

export const store =  configureStore({
    reducer: {
        product: shoppingReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =  typeof store.dispatch;
export type AppStore = typeof store