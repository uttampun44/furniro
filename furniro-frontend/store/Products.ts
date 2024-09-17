import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./Store";

export interface Product {
  id: number;
  product_name: string;
  name:string,
  sku:string,
  price: string;
  short_description: string;
  product_image: string;
  discount_price:string,
  description:string,
  addition_images:string
}

// products initial state
export interface ShoppingState {
  products: Product[];
  cart:any [];
  cartQuantity:number,
  selectedProduct: Product | null
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// intial state of state
const initialState: ShoppingState = {
  products: [],
  cart: [],
  cartQuantity:0,
  selectedProduct: null,
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk("fetch-products", async () => {
  const response = await axios.get("/api/front/products");
  return response.data.products.map((item:Product) => ({...item, addition_images:JSON.parse(item.addition_images)}));
});

//  functions of add to cart state and actions addToCart and removeCart
export const shoppingSlice = createSlice({
  name: "product",
  initialState,

  /* add to cart functionality*/
  reducers: {

    /* view to single product*/  
     selectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
/* product increment*/ 
    incrementProduct: (state, action: PayloadAction<number>) => {
    
      const products = state.cart.findIndex(product => product.id === action.payload)
      if (products) {
        state.cart[products].cartQuantity += 1;
      }
    },

    /*product decremenet quantity*/ 
    decrementProduct: (state, action: PayloadAction<number>) => {
      
      const product = state.cart.find(product => product.id === action.payload);
      if (product && product.quantity > 0) {
        product.quantity -= 1;
      }
    },
    /* add to cart item*/ 
    addToCart: (state, action: PayloadAction<Product>) => {

       const product = action.payload
      const existingProduct = state.cart.find(item => item.id === product?.id);
    
      if (existingProduct) {
        state.cart[existingProduct] += 1;
      }else{
        state.cart.push(product);
      } 
    },

    /*remove from cart*/
    removeCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
  },

  /*extra reducers for fetching data defining the loading state*/ 
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch products";
      });
  },
});

export const { addToCart, removeCart, selectedProduct, incrementProduct, decrementProduct } = shoppingSlice.actions;

export const selectProduct = (state: RootState) => state.product;
//  exporting shopping slice reducer
export default shoppingSlice.reducer;
