import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

export interface IProductCard {
  src: StaticImageData;
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface IMenuProductList {
  id: number;
  name: string;
  products: IProductCard[];
}

export interface IMenuProductListState {
  menuState: IMenuProductList[]
}

const initialMenuProductListState: IMenuProductListState = {
  menuState: []
}

export const MenuProductListSlice = createSlice({
  name: "MenuProductList",
  initialState: initialMenuProductListState,
  reducers: {
    setMenuProductListState : (state: IMenuProductListState , action: PayloadAction<IMenuProductList[]>) => {
      state.menuState = action.payload
    }
  },
});

export const { setMenuProductListState } = MenuProductListSlice.actions;
export default MenuProductListSlice.reducer;