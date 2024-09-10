import { configureStore } from "@reduxjs/toolkit";
import shoppingReducer from './Products'

export const store =  configureStore({
    reducer: shoppingReducer
})