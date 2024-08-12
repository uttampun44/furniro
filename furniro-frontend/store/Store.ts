import { configureStore } from "@reduxjs/toolkit";
import shoppingReducer from '../feature/Feature'

export const store =  configureStore({
    reducer: shoppingReducer
})