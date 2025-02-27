import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/services/types";

interface ProductsState {
  products: IProduct[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<{ product: IProduct }>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.product.id);
      if (index !== -1) {
        state.products[index] = action.payload.product;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
