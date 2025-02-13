import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';



export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: [
          "payload.item.createdAt",
          "payload.item.updatedAt",
          "payload.items.*.createdAt", // Ignore createdAt in arrays
          "payload.items.*.updatedAt",
          "payload.item.category.0.createdAt", // Ignore inside category array
          "payload.item.category.0.updatedAt", // Ignore inside category array

        ],
        ignoredPaths: ["cart.items"],
        
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;