import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit'
import { getEstadistica, getIndice } from './services/estadistica'
import type { RootState } from './store'
import { Estadistica } from '../../src/types/Estadistica'
import { IndiceItem } from '../types/IndiceItem'

interface AppState {
  activeNetworkActivity: boolean
  estadisticaId?: number
  activeTabName?: string
  estadisticaModel: Estadistica
  indiceEstadisticas: IndiceItem[]
  estadisticaIndicePath?: string
  clasificadorNivel1?: string
}

const initialState: AppState = {
  activeNetworkActivity: false,
  estadisticaId: 1,
  activeTabName: 'grafico',
  estadisticaModel: {},
  indiceEstadisticas: [],
  estadisticaIndicePath: '1.1.1.1',
  clasificadorNivel1: '1'
};

export const appSlice = createSlice({
  name: 'estadisticaForm',
  initialState,
  reducers: {
    setActiveNetworkActivity: (state, action: PayloadAction<boolean>) => {
      state.activeNetworkActivity = action.payload
    },
    setEstadisticaId: (state, action: PayloadAction<number>) => {
      state.estadisticaId = action.payload
    },
    setActiveTabName: (state, action: PayloadAction<string>) => {
      state.activeTabName = action.payload
    },
    setEstadisticaIndicePath: (state, action: PayloadAction<string>) => {
      state.estadisticaIndicePath = action.payload
      state.clasificadorNivel1 = action.payload.split('.')[0]
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
  setEstadisticaId,
  setActiveTabName,
  setEstadisticaIndicePath
} = appSlice.actions

export const selectActiveNetworkActivity = (state: RootState) => state.app.activeNetworkActivity
export const selectCurrentEstadisticaId = (state: RootState) => state.app.currentEstadisticaId
export const selectIdEstadisitico = (state: RootState) => state.app.idEstadistica
export const selectActiveTabName = (state: RootState) => state.app.activeTabName
export const selectEstadisticaData = (state: RootState) => state.app.estadisticaModel
export const selectEstadisticaDatos = (state: RootState) => state.app.estadisticaModel.datos
export const selectIndiceEstadisticas = (state: RootState) => state.app.indiceEstadisticas
export const selectClaficadorNivel1Activo = (state: RootState) => state.app.clasificadorNivel1
export const selectClasificadoresNivel1 = (state: RootState): IndiceItem[] => state.app.indiceEstadisticas.filter(
  (item: IndiceItem) => item.numeral.split('.').length === 1)

export const selectClasificadoresDesdeNivel2 = (state: RootState): IndiceItem[] =>
  state
    .app
    .indiceEstadisticas.filter((item: IndiceItem) => item.numeral.split('.').length > 1)


export const selectComponenteIndicePath = (state: RootState) => {
  const pathParts = state.app.estadisticaIndicePath?.split('.')
  return pathParts[0]
}
export const selectSubcomponenteIndicePath = (state: RootState) => {
  const pathParts = state.app.estadisticaIndicePath?.split('.')
  return pathParts[0] + '.' + pathParts[1]
}
export const selectTemaEstadisticoIndicePath = (state: RootState) => {
  const pathParts = state.app.estadisticaIndicePath?.split('.')
  return pathParts[0] + '.' + pathParts[1] + '.' + pathParts[2]
}
export const selectEstadisticaIndicePath = (state: RootState) => {
  return state.app.estadisticaIndicePath
}

export default appSlice.reducer
