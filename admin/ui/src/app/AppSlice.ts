import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit'
import { getEstadistica } from './services/estadistica';
import type { RootState } from './store';

interface AppState {
  activeNetworkActivity: boolean;
}

const initialState: AppState = {
  activeNetworkActivity: false,
};

export const appSlice = createSlice({
  name: 'estadisticaForm',
  initialState,
  reducers: {
    setActiveNetworkActivity: (state, action: PayloadAction<boolean>) => {
      state.activeNetworkActivity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getEstadistica.matchPending), (state, action) => {
      state.activeNetworkActivity = true;
    }).addMatcher(isAnyOf(getEstadistica.matchFulfilled, getEstadistica.matchRejected), (state, action) => {
      state.activeNetworkActivity = false;
    })
  }
});

export const {
  setActiveNetworkActivity,
} = appSlice.actions;

export const selectActiveNetworkActivity = (state: RootState) => state.app.activeNetworkActivity;

export default appSlice.reducer;
