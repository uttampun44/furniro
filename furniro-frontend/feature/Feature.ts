import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    shopping : [{id:"1", text:"Hello world"}]
}

export const shoppingAction = createSlice({

    name: 'shopping',
    initialState,
    reducers:{
        addToCart: (state, action) =>{
           const shopping = {id: nanoid(), tex}
           state.shopping.push(shopping)
        },
        removeCart: (state, action) =>{
           state.shopping = state.shopping.filter((key) => key.id ! action.payload)
        }
    }
})

export const {addToCart, removeCart} = shoppingAction.actions
 