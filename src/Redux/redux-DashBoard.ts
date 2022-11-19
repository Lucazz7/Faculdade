/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blocks, BlocksTreeId } from "../Model/blocksModel";
import { Forecast } from "../Model/forCast";
import {
  getAllBlocksMap,
  getBlocks,
  getBlocksMap,
  getForeCast,
} from "../services/dashboard-services";

export type DashState = {
  data: Blocks[];
  loading: boolean;
  lookerMapOrMap: boolean;
  error?: string;
  generationId: string;
  blocksMap: BlocksTreeId[];
  forCast: Forecast[];
  blocks: number[][][];
};

const inicialState = {
  data: [],
  lookerMapOrMap: false,
  loading: false,
  error: undefined,
  generationId: "",
  blocksMap: [],
  blocks: [],
  forCast: [],
} as DashState;

const propsMaps = createSlice({
  name: "propsMaps",
  initialState: inicialState,
  reducers: {
    getIdBlocks(state, { payload }: PayloadAction<{ getId: string }>) {
      return {
        ...state,
        generationId: payload.getId,

      };
    },
    getLookerBlock(state, { payload }: PayloadAction<{ isMapLookerOrMap: boolean }>) {
      return {
        ...state,
        lookerMapOrMap: payload.isMapLookerOrMap,

      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBlocks.pending, (state, action) => {
        setTimeout(() => {
          state.loading = true;
        }, 2000);
      })
      .addCase(
        getBlocks.fulfilled,
        (state, action: PayloadAction<Blocks[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getBlocks.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      // TODO: generationBlocks
      .addCase(getBlocksMap.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getBlocksMap.fulfilled,
        (state, action: PayloadAction<BlocksTreeId[]>) => {
          state.loading = false;
          state.blocksMap = action.payload;
        }
      )
      .addCase(getBlocksMap.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      // TODO: generationAllBlocks
      .addCase(getAllBlocksMap.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getAllBlocksMap.fulfilled,
        (state, action: PayloadAction<number[][][]>) => {
          state.loading = false;
          state.blocks = action.payload;
        }
      )
      .addCase(
        getAllBlocksMap.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
        }
      )
      //TODO: getForeCast
      .addCase(getForeCast.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getForeCast.fulfilled,
        (state, action: PayloadAction<Forecast[]>) => {
          state.loading = false;
          state.forCast = action.payload;
        }
      )
      .addCase(getForeCast.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export default propsMaps.reducer;
export const { getIdBlocks, getLookerBlock } = propsMaps.actions;
