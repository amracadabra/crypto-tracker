import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cryptoState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cryptoState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

const persistenceSlice = createSlice({
  name: 'persistence',
  initialState: {
    lastSaved: null,
    isPersisting: true
  },
  reducers: {
    setLastSaved: (state, action) => {
      state.lastSaved = action.payload;
    },
    togglePersistence: (state) => {
      state.isPersisting = !state.isPersisting;
    }
  }
});

export const { setLastSaved, togglePersistence } = persistenceSlice.actions;

export const persistMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  
  if (state.persistence.isPersisting) {
    saveState(state.crypto);
    store.dispatch(setLastSaved(new Date().toISOString()));
  }
  
  return result;
};

export const loadPersistedState = () => {
  const persistedState = loadState();
  if (persistedState) {
    return {
      crypto: persistedState
    };
  }
  return undefined;
};

export default persistenceSlice.reducer; 