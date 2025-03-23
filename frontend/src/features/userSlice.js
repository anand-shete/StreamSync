import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: null,
    name: null,
    email: null,
  },
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser: (state, action) => {
      state._id = null;
      state.name = null;
      state.email = null;
    },
  },
});

export const { setUser,clearUser } = userSlice.actions;
export default userSlice.reducer;
