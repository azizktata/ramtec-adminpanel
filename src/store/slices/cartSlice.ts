
import { Item } from "@/types/products-IncludeAll";
import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: Item[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};
const getItem = (state: CartState, id: string) =>
  state.items.find((item) => item.id === id);

const total = (state: CartState) => {
  state.total =
    state.items.reduce(
      (acc: number, item) => acc + item.prices!.price * item.quantity!,
      0
    ) || 0;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ item: Item; quantity: number }>) {
      if (getItem(state, action.payload.item.id)) {
        const existingItem = state.items.find(
          (item) => item.id === action.payload.item.id
        );
        if (existingItem) {
          existingItem.quantity! += action.payload.quantity;
        }
      } else {
        state.items.push({
          ...action.payload.item,
          quantity: action.payload.quantity,
        });
      }

      total(state);
    },
    removeFromCart(state, action: PayloadAction<{ id: string }>) {
      if (getItem(state, action.payload.id)) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        total(state);
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
    setCart(state, action: PayloadAction<{ items: Item[]; total: number }>) {
        state.items = action.payload.items;
        state.total = action.payload.total
    },
    addQuantity(state, action: PayloadAction<{ id: string }>) {
      if (getItem(state, action.payload.id)) {
        getItem(state, action.payload.id)!.quantity! += 1;
        total(state);
      }
    },
    reduceQuantity(state, action: PayloadAction<{ id: string }>) {
      if (getItem(state, action.payload.id)) {
        getItem(state, action.payload.id)!.quantity! -= 1;
        total(state);
      }
    },
  },
});
// export const addToCartAsync = createAsyncThunk(
//     'cart/addToCart',
//     async ({ item, quantity }: { item: Item; quantity: number }, { getState, dispatch }) => {
//       // Optionally perform some async operation here (e.g., API call)
      
//       // You can get the current cart state if needed
//       const state = getState().cart;
  
//       // Check if the item already exists in the cart
//       const existingItem = state.items.find(existing => existing.id === item.id);
  
//       if (existingItem) {
//         // If the item exists, update its quantity
//         return existingItem.quantity += quantity;
//       } else {
//         // If it doesn't exist, add it to the cart
//         return dispatch(addToCart({ item, quantity })); // Dispatch the regular addToCart action
//       }

//     }
//   );
export const { addToCart, removeFromCart, addQuantity, reduceQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
