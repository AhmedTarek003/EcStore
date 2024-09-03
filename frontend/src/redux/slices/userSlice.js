import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAllUsers(state, action) {
      state.users = action.payload;
    },
    deleteUser(state, action) {
      state.users = state.users.filter((u) => u._id !== action.payload);
    },
  },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };
