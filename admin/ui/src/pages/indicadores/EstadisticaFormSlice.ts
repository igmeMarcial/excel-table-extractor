import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getEstadistica } from '../../app/services/estadistica';
import type { RootState } from '../../app/store';
import { GRAFICO_PROPIEDADES_DEFECTO } from '../../config/grafico-propiedades-defecto';
import { TipoGrafico } from '../../types/TipoGrafico';
import { EstadisticaDatos } from '../../types/EstadisticaDatos';
import { Estadistica, FichaTecnicaFields } from '../../types/Estadistica';
import { EstadisticaFormState } from '../../types/EstadisticarFormState';
import tablaDatosHelper from '../../helpers/TablaDatosHelper';
import graficoHelper from '../../helpers/GraficoHelper';
import fieldValidationsHelper from '../../helpers/FieldValidationsHelper';
import { DataCell } from '../../types/DataCell';
import { ValidationError } from '../../types/ValidationError';

const estadisticaDefaultModel: Estadistica = {
  datos: {},
  datosInformacion: {},
  graficos: [
    {}
  ]
}

const initialState: EstadisticaFormState = {
  hasChanges: false,
  isCreationMode: true,
  titulo: '',
  estadisticaModel: estadisticaDefaultModel,
  estadisticaRawModel: estadisticaDefaultModel,
  activeTab: "1",
  echartDefaultProps: GRAFICO_PROPIEDADES_DEFECTO,
  validationErrors: {},
  // Validaciones
  validations: {
    nombre: {
      required: true
    },
    descripcion: {
      required: true
    }

  }
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
      const fielName = action.payload.field;
      const value = action.payload.value;
      state.estadisticaRawModel = {
        ...state.estadisticaRawModel,
        [fielName]: value
      }
      // Validar el campo
      const fieldErrors = fieldValidationsHelper.getFieldErrors(value, state.validations[fielName]);
      if (fieldErrors) {
        state.validationErrors = {
          ...state.validationErrors,
          [fielName]: fieldErrors
        }
      } else {
        // Eliminar el error si existe
        // TODO: Verificar código
        const { [fielName]: _, ...rest } = state.validationErrors;
        state.validationErrors = rest;
      }

      if (action.payload.field === 'nombre') {
        state.titulo = action.payload.value || '';
      }
      state.hasChanges = true;
    },
    setEstadisticaDatos: (state, action: PayloadAction<EstadisticaDatos>) => {
      state.estadisticaRawModel.datos = action.payload;
      state.estadisticaRawModel.datosInformacion = tablaDatosHelper.getInformacion(action.payload.tabla || []);
      state.estadisticaRawModel.graficos = graficoHelper.getGraficosDefecto(action.payload.tabla || []);
      state.hasChanges = true;
    },
    setEstadisticaTablaDatos: (state, action: PayloadAction<DataCell[][]>) => {
      state.estadisticaRawModel.datos.tabla = action.payload;
      console.log('TABLA: ', action.payload);
      if (!state.tienePresentacionGraficaPersonalizada) {
        state.estadisticaRawModel.graficos = graficoHelper.getGraficosDefecto(action.payload);
      }
      state.hasChanges = true;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload
    },
    setNavTab: (state) => {
      state.hasChanges = false;
      state.estadisticaRawModel = { ...state.estadisticaModel };
    },
    setTipoGrafico: (state, action: PayloadAction<{ index: number, tipoGrafico: TipoGrafico }>) => {
      state.estadisticaRawModel.graficos = state.estadisticaRawModel.graficos.map((chart, index) => {
        if (index === action.payload.index) {
          return { ...chart, tipoGrafico: action.payload.tipoGrafico };
        }
        return chart;
      })
    },
    setFieldValidationErrors: (state, action: PayloadAction<{ fieldName: string, errors: ValidationError[] }>) => {
      state.validationErrors = {
        ...state.validationErrors,
        [action.payload.fieldName]: action.payload.errors
      }
    },
    setValidationErrors: (state, action: PayloadAction<Record<string, ValidationError[]>>) => {
      state.validationErrors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getEstadistica.matchFulfilled, (state, action) => {
      state.estadisticaModel = { ...estadisticaDefaultModel, ...action.payload };
      state.estadisticaRawModel = { ...estadisticaDefaultModel, ...action.payload };
      state.estadisticaRawModel.datos = action.payload.datos || {};
      state.titulo = action.payload.nombre || '';
      state.isCreationMode = false;
      state.hasChanges = false;
    })
  },
});

export const {
  setEstadisticaFields,
  setEstadisticaDatos,
  setEstadisticaTablaDatos,
  setEstadisticaFieldValue,
  setActiveTab,
  setTipoGrafico,
  resetChanges,
  commitChanges,
  setNavTab,
  // field validation
  setFieldValidationErrors,
  setValidationErrors
} = estadisticaFormSlice.actions;

export const selectHasChanges = (state: RootState) => state.estadisticaForm.hasChanges;
export const selectTitulo = (state: RootState) => state.estadisticaForm.titulo;
export const selectEstadisticaFields = (state: RootState) => state.estadisticaForm.estadisticaRawModel;
export const selectEstadisticaDataFields = (state: RootState) => state.estadisticaForm.estadisticaRawModel.datos || {};
export const selectIsCreationMode = (state: RootState) => state.estadisticaForm.isCreationMode;
export const selectActiveTab = (state: RootState) => state.estadisticaForm.activeTab;
export const selectEstadisticaData = (state: RootState) => state.estadisticaForm.estadisticaModel.datos?.tabla;
export const selectPostValues = (state: RootState) => state.estadisticaForm.estadisticaRawModel;
export const selectGraficos = (state: RootState) => state.estadisticaForm.estadisticaRawModel.graficos;
export const selectGraficoOpcionesDefecto = (state: RootState) => state.estadisticaForm.echartDefaultProps;
export const selectRecomendacionGrafica = (state: RootState) => state.estadisticaForm.recomendacionGrafica;
export const selectValidationErrors = (state: RootState) => state.estadisticaForm.validationErrors;

export const selectGraficoPropiedades = (index: number) => (state: RootState) => {
  return state.estadisticaForm.estadisticaRawModel.graficos[index]
}

export default estadisticaFormSlice.reducer;
