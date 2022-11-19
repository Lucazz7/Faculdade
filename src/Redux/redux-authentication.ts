import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Authentication } from '../services/login-services';

export interface AuthenticationState {
  loading: boolean;
  data: any;
  error?: string;
  valid: boolean;
}

const inicialState = {
  loading: false,
  data: null,
  error: undefined,
  valid: false,
} as AuthenticationState;

const propsAuthentication = createSlice({
  name: 'authentication',
  initialState: inicialState,
  reducers: {
    addPropsAuthenticantion(state, { payload }: PayloadAction<AuthenticationState>) {
      return {
        ...state,
        error: payload.error,
        loading: payload.loading,
        data: payload.data,
        valid: payload.valid,
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(Authentication.pending, (state) => {
        state.loading = true;
      })
      .addCase(Authentication.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload.data;
        state.valid = true;
      })
      .addCase(Authentication.rejected, (state, { error }) => {
        state.error = error.message;
      })
  },

})

export default propsAuthentication.reducer;
export const { addPropsAuthenticantion } = propsAuthentication.actions;

