import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Blocks, BlocksLatLong, BlocksTreeId } from "../Model/blocksModel";
import { Forecast } from "../Model/forCast";

export const getBlocks = createAsyncThunk(
  "blocks/getBlocks",
  async (data, thunkApi) => {
    try {
      const response = await axios.get<Blocks[]>(
        "http://localhost:7010/blocks"
      );
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getBlocksMap = createAsyncThunk(
  "blocksMap/getBlocks",
  async (blockId: string, thunkApi) => {
    try {
      const response = await axios.get<BlocksTreeId[]>(
        `http://localhost:7010/gerarBlock/?blockParent=${blockId}`
      );
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getAllBlocksMap = createAsyncThunk(
  "AllblocksMap/getBlocks",
  async (data, thunkApi) => {
    try {
      const response = await axios.get<BlocksLatLong[]>(
        `http://localhost:7010/gerarBlock`
      );

      return response.data.map((item) => item.bounds);
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getForeCast = createAsyncThunk(
  "ForeCast/getForeCast",
  async (blockId: string, thunkApi) => {
    try {
      const response = await axios.get<Forecast[]>(
        `http://localhost:7010/forCast/?blockId=${blockId}`
      );
      return response.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
