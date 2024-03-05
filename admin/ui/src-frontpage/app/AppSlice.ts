import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit'
import { getEstadistica, getIndice } from './services/estadistica'
import type { RootState } from './store'
import { Estadistica } from '../../src/types/Estadistica'
import { IndiceItem } from '../types/IndiceItem'

interface AppState {
  activeNetworkActivity: boolean
  currentEstadisticaId?: number
  idEstadistica?: number
  activeTabName?: string
  estadisticaModel: Estadistica
  indiceEstadisticas: IndiceItem[]
}

const initialState: AppState = {
  activeNetworkActivity: false,
  currentEstadisticaId: 1,
  idEstadistica: 0,
  activeTabName: 'grafico',
  estadisticaModel: {},
  indiceEstadisticas: []
};

export const appSlice = createSlice({
  name: 'estadisticaForm',
  initialState,
  reducers: {
    setActiveNetworkActivity: (state, action: PayloadAction<boolean>) => {
      state.activeNetworkActivity = action.payload
    },
    setCurrentEstadisticaId: (state, action: PayloadAction<number>) => {
      state.currentEstadisticaId = action.payload
    },
    setIdEstadistica: (state, action: PayloadAction<number>) => {
      state.idEstadistica = action.payload
    },
    setActiveTabName: (state, action: PayloadAction<string>) => {
      state.activeTabName = action.payload
    }

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
    builder.addMatcher(getIndice.matchFulfilled, (state, action) => {
      state.indiceEstadisticas = action.payload
    })
  }
})

export const {
  setActiveNetworkActivity,
  setCurrentEstadisticaId,
  setIdEstadistica,
  setActiveTabName
} = appSlice.actions

export const selectActiveNetworkActivity = (state: RootState) => state.app.activeNetworkActivity
export const selectCurrentEstadisticaId = (state: RootState) => state.app.currentEstadisticaId
export const selectIdEstadisitico = (state: RootState) => state.app.idEstadistica
export const selectActiveTabName = (state: RootState) => state.app.activeTabName
export const selectEstadisticaData = (state: RootState) => state.app.estadisticaModel
export const selectEstadisticaDatos = (state: RootState) => state.app.estadisticaModel.datos
export const selectIndiceEstadisticas = (state: RootState) => state.app.indiceEstadisticas

export default appSlice.reducer
