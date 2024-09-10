import { createSlice, nanoid, PayloadAction,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


interface Shopping{
id:string,
text:string
}

interface product  {
    product_name:string,
    price:string,
    short_description:string,
    product_image:string,
   
   }

// products initial state   
interface ShoppingState{
    shoppings: Shopping[],
    product: product[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// intial state of state
const initialState: ShoppingState = {
    shoppings : [{id:"1", text:"Hello world"}],
    product:[],
    status: 'idle',
    error:null
}

export const fetchProducts = createAsyncThunk('fetch-products', async() =>{
    const response = await axios.get('/api/front/products')
    return response.data
})


//  functions of add to cart state and actions addToCart and removeCart
export const shoppingSlice = createSlice({

   
    name: 'shopping',
    initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<string>) => {
            const shopping = { id: nanoid(), text: action.payload };
            state.shoppings.push(shopping);
          },
          removeCart: (state, action: PayloadAction<string>) => {
            state.shoppings = state.shoppings.filter((item) => item.id !== action.payload);
          },
    },
    
    extraReducers: (builder) => {
        builder
          .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.product.push(...action.payload)
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Failed to fetch products';
          });
      },

})

export const {addToCart, removeCart} = shoppingSlice.actions

//  exporting shopping slice reducer
export default shoppingSlice.reducer