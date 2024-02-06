import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slice/userSlice";
const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: persistedState,
});

// Subscribe to store updates
store.subscribe(() => {
  // Save state to local storage
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;