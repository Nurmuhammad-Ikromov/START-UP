import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    matchedBookTitle: [],
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setMatchedBookTitle: (state, action) => {
            state.matchedBookTitle = (action.payload);
        },
    },
});

export const { setMatchedBookTitle } = searchSlice.actions;
export default searchSlice.reducer;
