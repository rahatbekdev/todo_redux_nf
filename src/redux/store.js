


import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import todosSlice from "./todoSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    todos: todosSlice,
  },
});

export default store;
