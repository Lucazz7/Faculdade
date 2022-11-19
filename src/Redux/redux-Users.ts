import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UsersType } from "../Model/blocksModel";
import { createUsers, deleteUsers, editUsers, getUsers } from "../services/users-services";

export interface UsersState {
  loading: boolean;
  action: boolean;
  error: string;
  data: UsersType[];
}

const initialState = {
  loading: false,
  error: '',
  data: [],
} as UsersState;

const duckUsers = createSlice({
  name: "userGet",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.action = false;

      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<UsersType[]>) => {
        state.loading = false;
        state.data = action.payload;
        state.action = false;

      })
      .addCase(getUsers.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.action = false;

      })
      // TODO: Criando usuario novo
      .addCase(createUsers.pending, (state) => {
        state.loading = true;
        state.action = false;

      })
      .addCase(createUsers.fulfilled, (state) => {
        state.loading = false;
        state.action = true;

      })
      .addCase(createUsers.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.action = false;

      })
      // TODO: Editar usuário
      .addCase(editUsers.pending, (state) => {
        state.loading = true;
        state.action = false;

      })
      .addCase(editUsers.fulfilled, (state) => {
        state.loading = false;
        state.action = true;

      })
      .addCase(editUsers.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.action = false;

      })
      // TODO: Delete users
      .addCase(deleteUsers.pending, (state) => {
        state.action = false;
        state.loading = true;
      })
      .addCase(deleteUsers.fulfilled, (state) => {
        state.loading = false;
        state.action = true;

      })
      .addCase(deleteUsers.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.action = false;

      })
  },
});

export default duckUsers.reducer;