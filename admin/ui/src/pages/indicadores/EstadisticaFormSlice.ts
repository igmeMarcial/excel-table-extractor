import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getEstadistica } from '../../app/services/estadistica';
import type { RootState } from '../../app/store';
import { DEFAULT_ESTADISTICA_PUBLISH_SETTINGS } from '../../config/estadistica-publish-settings';
import { ConfigGrafico } from '../../types/ConfigGrafico';
import { TipoGrafico } from '../../types/TipoGrafico';
import { EstadisticaDatos } from '../../types/EstadisticaDatos';
import { Estadistica, FichaTecnicaFields } from '../../types/Estadistica';
import { EstadisticaFormState } from '../../types/EstadisticarFormState';

// Tab datos

const estadisticaDefaultModel: Estadistica = {
  datos: {},
  parametrosPublicacion: {},
}

const initialState: EstadisticaFormState = {
  hasChanges: false,
  isCreationMode: true,
  titulo: '',
  estadisticaModel: estadisticaDefaultModel,
  estadisticaRawModel: estadisticaDefaultModel,
  parametrosPublicacionDefecto: DEFAULT_ESTADISTICA_PUBLISH_SETTINGS,
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
      state.estadisticaRawModel = { ...state.estadisticaRawModel, ...action.payload };
      state.titulo = action.payload.nombre || '';
      state.hasChanges = true;
    },
    setEstadisticaFieldValue: (state, action: PayloadAction<{ field: string, value: any }>) => {
      state.estadisticaRawModel = {
        ...state.estadisticaRawModel,
        [action.payload.field]: action.payload.value
      }
      if (action.payload.field === 'nombre') {
        state.titulo = action.payload.value || '';
      }
      state.hasChanges = true;
    },
    setEstadisticaDataFields: (state, action: PayloadAction<EstadisticaDatos>) => {
      state.estadisticaRawModel.datos = action.payload;
      state.hasChanges = true;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload
    },
    setNavTab: (state) => {
      state.hasChanges = false;
      state.estadisticaRawModel = { ...state.estadisticaModel };
    },
    // Gráficos
    // Actualizar la configuración de un gráfico
    setConfigGrafico: (state, action: PayloadAction<{ index: number, config: ConfigGrafico }>) => {
      state.estadisticaRawModel.parametrosPublicacion = {
        ...state.estadisticaRawModel.parametrosPublicacion,
        graficos: state.estadisticaRawModel.parametrosPublicacion?.graficos.map((chart, index) => {
          if (index === action.payload.index) {
            return action.payload.config;
          }
          return chart;
        })

      }
    },
    setTipoGrafico: (state, action: PayloadAction<{ index: number, tipoGrafico: TipoGrafico }>) => {
      state.estadisticaRawModel.parametrosPublicacion = {
        ...state.estadisticaRawModel.parametrosPublicacion,
        graficos: state.estadisticaRawModel.parametrosPublicacion?.graficos.map((chart, index) => {
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
  setEstadisticaFieldValue,
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
export const selectEstadisticaDataFields = (state: RootState) => state.estadisticaForm.estadisticaRawModel.datos || {};
export const selectIsCreationMode = (state: RootState) => state.estadisticaForm.isCreationMode;
export const selectActiveTab = (state: RootState) => state.estadisticaForm.activeTab;
export const selectEstadisticaData = (state: RootState) => state.estadisticaForm.estadisticaModel.datos?.tabla;
export const selectPostValues = (state: RootState) => state.estadisticaForm.estadisticaRawModel;


export const selectConfigGrafico = (index: number) => (state: RootState) => {
  return {
    ...state.estadisticaForm.parametrosPublicacionDefecto.configGrafico,
    ...state.estadisticaForm.estadisticaRawModel.parametrosPublicacion?.graficos[index]
  }
}

export const selectTipoGrafico = (index: number) => (state: RootState) => {
  return state.estadisticaForm.estadisticaRawModel.parametrosPublicacion?.graficos[index]?.tipoGrafico ||
    state.estadisticaForm.parametrosPublicacionDefecto.configGrafico.tipoGrafico;
};

export default estadisticaFormSlice.reducer;
