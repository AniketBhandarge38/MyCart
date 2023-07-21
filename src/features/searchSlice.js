import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      const query = action.payload;
      state.searchQuery = query;

      console.log(state.searchQuery);
    },
  },
});

export const { searchProduct } = searchSlice.actions;

export default searchSlice.reducer;
