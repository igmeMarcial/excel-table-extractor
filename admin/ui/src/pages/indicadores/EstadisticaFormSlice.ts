import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getEstadistica } from '../../app/services/estadistica';
import type { RootState } from '../../app/store';
import { DEFAULT_ESTADISTICA_PUBLISH_SETTINGS } from '../../config/estadistica-publish-settings';
import { ConfigGrafico } from '../../types/ConfigGrafico';
import { TipoGrafico } from '../../types/TipoGrafico';
import { TablaDatos } from '../../types/TablaDatos';
import { Estadistica, FichaTecnicaFields } from '../../types/Estadistica';
import { EstadisticaFormState } from '../../types/EstadisticarFormState';

// Tab datos

const estadisticaDefaultModel: Estadistica = {
  configPublicacion: DEFAULT_ESTADISTICA_PUBLISH_SETTINGS,
  tablaDatos: {}
}

const initialState: EstadisticaFormState = {
  hasChanges: false,
  isCreationMode: true,
  titulo: '',
  estadisticaModel: estadisticaDefaultModel,
  estadisticaRawModel: estadisticaDefaultModel,
  activeTab: "1",
};
// TODO: Implementar algoritmo para determinar si hay cambios en el formulario

export const estadisticaFormSlice = createSlice({
  name: 'estadisticaForm',
  initialState,
  reducers: {
    resetChanges: (state) => {
      state.hasChanges = false;
      state.estadisticaRawModel = { ...state.estadisticaModel };
    },
    commitChanges: (state) => {
      state.estadisticaModel = { ...state.estadisticaRawModel };
      state.hasChanges = false;
    },
    setEstadisticaFields: (state, action: PayloadAction<FichaTecnicaFields>) => {
      state.estadisticaRawModel = { ...state.estadisticaModel, ...action.payload };
      state.titulo = action.payload.nombre || '';
      state.hasChanges = true;
    },
    setEstadisticaDataFields: (state, action: PayloadAction<TablaDatos>) => {
      state.estadisticaRawModel.tablaDatos = action.payload;
      state.hasChanges = true;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload
    },
    setNavTab:(state)=>{
      state.hasChanges = false;
      state.estadisticaRawModel = { ...state.estadisticaModel };
    },
    // Gráficos
    // Actualizar la configuración de un gráfico
    setConfigGrafico: (state, action: PayloadAction<{ index: number, config: ConfigGrafico }>) => {
      state.estadisticaRawModel.configPublicacion = {
        ...state.estadisticaRawModel.configPublicacion,
        graficos: state.estadisticaRawModel.configPublicacion.graficos.map((chart, index) => {
          if (index === action.payload.index) {
            return action.payload.config;
          }
          return chart;
        })

      }
    },
    setTipoGrafico: (state, action: PayloadAction<{ index: number, tipoGrafico: TipoGrafico }>) => {
      state.estadisticaRawModel.configPublicacion = {
        ...state.estadisticaRawModel.configPublicacion,
        graficos: state.estadisticaRawModel.configPublicacion.graficos.map((chart, index) => {
          if (index === action.payload.index) {
            return { ...chart, tipoGrafico: action.payload.tipoGrafico };
          }
          return chart;
        })

      }
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(getEstadistica.matchFulfilled, (state, action) => {
      state.estadisticaModel = { ...estadisticaDefaultModel, ...action.payload };
      state.estadisticaRawModel = { ...estadisticaDefaultModel, ...action.payload };
      state.titulo = action.payload.nombre || '';
      state.isCreationMode = false;
      state.hasChanges = false;
    })
  },
});

export const {
  setEstadisticaFields,
  setEstadisticaDataFields,
  setActiveTab,
  setConfigGrafico,
  setTipoGrafico,
  resetChanges,
  commitChanges,
  setNavTab,
} = estadisticaFormSlice.actions;

export const selectHasChanges = (state: RootState) => state.estadisticaForm.hasChanges;
export const selectTitulo = (state: RootState) => state.estadisticaForm.titulo;
export const selectEstadisticaFields = (state: RootState) => state.estadisticaForm.estadisticaRawModel;
export const selectEstadisticaDataFields = (state: RootState) => state.estadisticaForm.estadisticaRawModel.tablaDatos;
export const selectIsCreationMode = (state: RootState) => state.estadisticaForm.isCreationMode;
export const selectActiveTab = (state: RootState) => state.estadisticaForm.activeTab;
export const selectEstadisticaData = (state: RootState) => state.estadisticaForm.estadisticaModel.tablaDatos.datos;




export const selectConfigGrafico = (index: number) => (state: RootState) => {
  return {
    ...state.estadisticaForm.estadisticaRawModel.configPublicacion.defaults.configGrafico,
    ...state.estadisticaForm.estadisticaRawModel.configPublicacion.graficos[index]
  }
}

export const selectTipoGrafico = (index: number) => (state: RootState) => {
  return state.estadisticaForm.estadisticaRawModel.configPublicacion.graficos[index].tipoGrafico || state.estadisticaForm.estadisticaRawModel.configPublicacion.defaults.configGrafico.tipoGrafico
};

export default estadisticaFormSlice.reducer;
