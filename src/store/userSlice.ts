import { createSlice } from "@reduxjs/toolkit";

interface UserData {
  username?: string;
  email?: string;
  password?: string;
}

interface UserState {
  userData: UserData;
}

const initialState: UserState = {
  userData: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.userData ={};
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;


