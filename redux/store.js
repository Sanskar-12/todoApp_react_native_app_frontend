import { configureStore } from "@reduxjs/toolkit";
import { authReducer, taskReducer, updateReducer } from "./reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    update: updateReducer,
  },
});

export default store;
