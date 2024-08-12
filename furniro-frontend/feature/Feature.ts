import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";


interface Shopping{
id:string,
text:string
}

interface ShoppingState{
    shoppings: Shopping[]
}

// intial state of state
const initialState: ShoppingState = {
    shoppings : [{id:"1", text:"Hello world"}]
}

//  functions of add to cart state and actions addToCart and removeCart
export const shoppingSlice = createSlice({

    name: 'shopping',
    initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<string>) =>{
           const shoppings = {id: nanoid(), text:action.payload}
           state.shoppings.push(shoppings)
        },
        removeCart: (state, action: PayloadAction<string>) =>{
           state.shoppings = state.shoppings.filter((key) => key.id !== action.payload)
        }
    }
})

export const {addToCart, removeCart} = shoppingSlice.actions

//  exporting shopping slice reducer
export default shoppingSlice.reducer