import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("tasks")) || [],
};

const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTasks: (state, { payload }) => {
      state.items = [...state.items, payload];
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },

    removeTasks: (state, { payload }) => {
      state.items = state.items.filter((task) => task.id !== payload);
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },
    updatedTasks: (state, { payload }) => {
      state.items = payload;
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },
  },
});

export const { addTasks, removeTasks, updatedTasks } = toDoSlice.actions;

export default toDoSlice.reducer;
