import type { RootState } from "@/redux/store";
import type { IUser } from "@/types/user-types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  user: IUser[];
}

const initialState: InitialState = {
  user: [
    {
      id: "1",
      name: "Abu Bokkor",
    },
    {
      id: "2",
      name: "Likhon",
    },
  ],
};

type DraftUser = Pick<IUser, "name">;

const createUser = (userData: DraftUser): IUser => {
  return { id: nanoid(), ...userData };
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      const userData = createUser(action.payload);
      state.user.push(userData);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.user = state.user.filter((user) => user.id !== action.payload);
    },
  },
});

export const selectUsers = (state: RootState) => {
  return state.users.user;
};

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
