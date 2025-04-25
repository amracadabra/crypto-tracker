import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice';
import persistenceReducer, { persistMiddleware, loadPersistedState } from './persistenceSlice';

const persistedState = loadPersistedState();

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    persistence: persistenceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware),
  preloadedState: persistedState
}); 