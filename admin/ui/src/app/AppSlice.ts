import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit'
import { getEstadistica } from './services/estadistica';
import type { RootState } from './store';

interface AppState {
  activeNetworkActivity: boolean;
  currentEstadisticaId?: number;
}

const initialState: AppState = {
  activeNetworkActivity: false,
  currentEstadisticaId: 1,
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setActiveNetworkActivity: (state, action: PayloadAction<boolean>) => {
      state.activeNetworkActivity = action.payload;
    },
    setCurrentEstadisticaId: (state, action: PayloadAction<number>) => {
      state.currentEstadisticaId = action.payload;
    }
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
  setCurrentEstadisticaId,
} = appSlice.actions;

export const selectActiveNetworkActivity = (state: RootState) => state.app.activeNetworkActivity;
export const selectCurrentEstadisticaId = (state: RootState) => state.app.currentEstadisticaId;

export default appSlice.reducer;
