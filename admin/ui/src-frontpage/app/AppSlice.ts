import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit'
import { getEstadistica, getIndiceEstadisticas } from './services/estadistica'
import type { RootState } from './store'
import { IndiceItem } from '../types/IndiceItem'
import { Estadistica } from '../types/Estadistica'

interface AppState {
  activeNetworkActivity: boolean
  estadisticaModel: Estadistica
  indiceEstadisticas: IndiceItem[]
  estadisticaIndicePath?: string
}

const initialState: AppState = {
  activeNetworkActivity: false,
  estadisticaModel: null,
  indiceEstadisticas: [],
  estadisticaIndicePath: '1.1.1.1',
};

export const appSlice = createSlice({
  name: 'estadisticaForm',
  initialState,
  reducers: {
    setActiveNetworkActivity: (state, action: PayloadAction<boolean>) => {
      state.activeNetworkActivity = action.payload
    },
    setEstadisticaIndicePath: (state, action: PayloadAction<string>) => {
      const path = action.payload
      const pathParts = path.split('.')
      state.estadisticaIndicePath = path
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getEstadistica.matchPending), (state, action) => {
      state.activeNetworkActivity = true
    }).addMatcher(isAnyOf(getEstadistica.matchFulfilled, getEstadistica.matchRejected), (state, action) => {
      state.activeNetworkActivity = false
    })
    builder.addMatcher(getEstadistica.matchFulfilled, (state, action) => {
      state.estadisticaModel = action.payload
    })
    builder.addMatcher(getIndiceEstadisticas.matchFulfilled, (state, action) => {
      state.indiceEstadisticas = action.payload;
    })
  }
})

export const {
  setActiveNetworkActivity,
  setEstadisticaIndicePath,
} = appSlice.actions

export const selectActiveNetworkActivity = (state: RootState) => state.app.activeNetworkActivity
export const selectCurrentEstadisticaId = (state: RootState) => state.app.currentEstadisticaId
export const selectEstadisticaDatos = (state: RootState) => state.app.estadisticaModel.datos
export const selectIndiceEstadisticas = (state: RootState) => state.app.indiceEstadisticas


export default appSlice.reducer
