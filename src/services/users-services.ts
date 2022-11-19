import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UsersType } from "../Model/blocksModel";
import { CreateUser } from "../pages/Usuarios/useUSers";

export const getUsers = createAsyncThunk(
  "get/getUsers",
  async (data, thunkApi) => {
    try {
      const response = await axios.get<UsersType[]>(
        "http://localhost:7010/users"
      );
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const createUsers = createAsyncThunk(
  "crete/createUsers",
  async (user: CreateUser
    , thunkApi) => {
    try {
      axios.post('http://localhost:7010/users/', {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        phone: user.phone,
        photoURL: user.photoURL,
      })
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const editUsers = createAsyncThunk(
  "edit/editUsers",
  async (user: CreateUser
    , thunkApi) => {
    try {
      axios.put(`http://localhost:7010/users/${user.id}`, {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        phone: user.phone,
        photoURL: user.photoURL,
      })
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteUsers = createAsyncThunk(
  "delete/deleteUsers",
  async (id: string
    , thunkApi) => {
    try {
      axios.delete(`http://localhost:7010/users/${id}`)
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);