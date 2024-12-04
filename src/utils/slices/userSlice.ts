import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  bio: string;
  profilePic: string;
  email: string;
  password: string;
}

interface UserState {
  user: User[];
}

const initialState: UserState = {
  user: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.user.push(action.payload);
    },
    removeUser: (state) => {
      state.user = [];
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
