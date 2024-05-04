import { configureStore } from "@reduxjs/toolkit";

import toDoSlice from "./to-do-slice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    todo: toDoSlice,
    user: userReducer,
  },
});

export default store;
