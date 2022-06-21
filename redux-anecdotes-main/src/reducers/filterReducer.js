import { createSlice } from "@reduxjs/toolkit";

const FilterSlice = createSlice(
  {
    name: "filter",
    initialState: "",
    reducers: {
      setFilter: (state, action) => action.payload,
    },
  },
  {}
);

export const { setFilter } = FilterSlice.actions;
export default FilterSlice.reducer;
