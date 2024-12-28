import { createSlice } from "@reduxjs/toolkit";

const staffSlice = createSlice({
  name: "staffSlice",
  initialState: { user: {}, totalGuide: null },

  reducers: {
    jwtToken: (state, action) => {
      state.user = action.payload;
    },

  },
});

export const { jwtToken, userTodoGuide } = staffSlice.actions;
export default staffSlice.reducer;
