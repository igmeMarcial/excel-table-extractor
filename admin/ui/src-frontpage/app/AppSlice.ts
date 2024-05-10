import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit'
import { getEstadistica, getIndice } from './services/estadistica'
import type { RootState } from './store'
import { Estadistica } from '../../src/types/Estadistica'
import { IndiceItem } from '../types/IndiceItem'
import { EstadisticaMarcoOrdenador } from '../../src/types/EstadisticaMarcoOrdenador'

interface AppState {
  activeNetworkActivity: boolean
  estadisticaId?: number
  activeTabName?: string
  estadisticaModel: Estadistica
  indiceEstadisticas: IndiceItem[]
  estadisticaIndicePath?: string
  clasificadorNivel1?: string,
  marcoOrdenadorSeleccionado: string,
  menuNivel2: IndiceItem[],
  colorComponent: string,
}

const initialState: AppState = {
  activeNetworkActivity: false,
  estadisticaId: 1,
  activeTabName: 'grafico',
  marcoOrdenadorSeleccionado: 'mdea',
  estadisticaModel: {},
  indiceEstadisticas: [],
  estadisticaIndicePath: '1.1.1.1',
  clasificadorNivel1: '1',
  menuNivel2: [],
  colorComponent: '#575757'
};
const getMenuNivel2 = (indice: IndiceItem[], clasificadorNivel1: string) => {
  return indice.map((item) => {
    item.expanded = false;
    if (
      item.nivel === 2 &&
      item.numeral.split('.')[0] === clasificadorNivel1
    ) {
      item.visible = true;
    } else {
      item.visible = false;
    }
    return item;
  })
}
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
    setMarcoOrdenadorSeleccionado: (state, action: PayloadAction<string>) => {
      console.log('setMarcoOrdenadorSeleccionado__Call', action.payload)
      state.marcoOrdenadorSeleccionado = action.payload
    },
    setEstadisticaIndicePath: (state, action: PayloadAction<string>) => {
      const path = action.payload
      const pathParts = path.split('.')
      state.estadisticaIndicePath = path
      if (pathParts[0] !== state.clasificadorNivel1) {
        state.clasificadorNivel1 = pathParts[0]
        state.menuNivel2 = getMenuNivel2(state.indiceEstadisticas, state.clasificadorNivel1)
      }
    },
    setColorComponent: (state, action: PayloadAction<string>) => {
      state.colorComponent = action.payload;
    },
    toggleMenuNivel2Item: (state, action: PayloadAction<IndiceItem>) => {
      const { numeral, expanded, nivel } = action.payload;

      const doExpand = !expanded;

      const newindice = state.menuNivel2.map((item) => {
        //Invertir toggle expander
        if (item.numeral === numeral) {
          item.expanded = !item.expanded;
        }
        //Hijos directos e indirectos
        if (item.nivel > nivel && item.numeral.startsWith(numeral)) {
          if (item.nivel === nivel + 1) {
            item.visible = doExpand;
          }
          if (item.nivel > nivel + 1 && !doExpand) {
            item.visible = false;
          }
        }
        return item;
      });
      state.menuNivel2 = newindice;
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
      const indice = [];
      action.payload.forEach((item: IndiceItem) => {
        indice.push({
          ...item,
          nivel: item.numeral.split('.').length,
          hasChildren: action.payload.some((child: any) => {
            return child.numeral.startsWith(item.numeral + '.');
          })
        })
      })
      state.indiceEstadisticas = indice;
      state.menuNivel2 = getMenuNivel2(indice, state.clasificadorNivel1)
    })
  }
})

export const {
  setActiveNetworkActivity,
  setEstadisticaId,
  setMarcoOrdenadorSeleccionado,
  setActiveTabName,
  toggleMenuNivel2Item,
  setEstadisticaIndicePath,
  setColorComponent
} = appSlice.actions

export const selectActiveNetworkActivity = (state: RootState) => state.app.activeNetworkActivity
export const selectCurrentEstadisticaId = (state: RootState) => state.app.currentEstadisticaId
export const selectIdEstadisitico = (state: RootState) => state.app.idEstadistica
export const selectActiveTabName = (state: RootState) => state.app.activeTabName
export const selectEstadisticaData = (state: RootState): Estadistica => state.app.estadisticaModel
export const selectEstadisticaDatos = (state: RootState) => state.app.estadisticaModel.datos
export const selectEstadisticaMarcoOrdenador = (state: RootState): EstadisticaMarcoOrdenador => state.app.estadisticaModel.marcoOrdenador
export const selectEstadisticaGraficos = (state: RootState) => state.app.estadisticaModel.graficos || []
export const selectIndiceEstadisticas = (state: RootState) => state.app.indiceEstadisticas
export const selectClaficadorNivel1Activo = (state: RootState) => state.app.clasificadorNivel1
export const selectMenuNivel2 = (state: RootState) => state.app.menuNivel2
export const selectMarcoOrdenadorSeleccionado = (state: RootState) => state.app.marcoOrdenadorSeleccionado

// TODO: selectClasificadoresNivel1 AND 2 returned a different result when called with the same parameters
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
export const selectColorComponent = (state: RootState) => state.app.colorComponent

export default appSlice.reducer
