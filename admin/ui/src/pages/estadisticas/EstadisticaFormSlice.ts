import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store';
import validationsHelper from '../../helpers/ValidationsHelper';
import tablaDatosHelper from '../../helpers/TablaDatosHelper';
import graficoHelper from '../../helpers/GraficoHelper';
import { TipoGrafico } from '../../types/TipoGrafico';
import { Estadistica, FichaTecnicaFields } from '../../types/Estadistica';
import { EstadisticaFormState } from '../../types/EstadisticarFormState';
import { Grafico } from '../../types/Grafico';
import { FormatoTabla } from '../../types/FormatoTabla';
import { ValidationErrors } from '../../core/Validators';
import { ESTADISTICA_FULL_FIELDS_DEF } from './editor/EstadisticaFieldsDef';
import { Cell } from '../../types/Cell';
import { ChartDataRanges } from '../../types/ChartDataRanges';

const estadisticaDefaultModel: Estadistica = {
  datos: [],
  datosInformacion: {},
  presentacionTablaFormato: {},
  graficos: [
    { id: 1, series: [], categorias: [] }
  ],
}

const initialState: EstadisticaFormState = {
  hasChanges: false,
  isCreationMode: true,
  titulo: '',
  estadisticaModel: estadisticaDefaultModel,
  estadisticaRawModel: estadisticaDefaultModel,
  activeTab: "1",
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
    resetEstadisticaModel: (state) => {
      state.estadisticaModel = estadisticaDefaultModel;
      state.estadisticaRawModel = estadisticaDefaultModel;
      state.titulo = '';
      state.isCreationMode = true;
      state.hasChanges = false;
    },
    resetPresentacionChanges: (state) => {
      const currentEstadisticaRawModel = current(state.estadisticaRawModel);
      state.estadisticaRawModel.datosInformacion = tablaDatosHelper.getInformacion(currentEstadisticaRawModel.datos);
      state.estadisticaRawModel.graficos = [graficoHelper.getGraficoDefecto(currentEstadisticaRawModel)];
      state.validationErrors = getFullValidationErrors(currentEstadisticaRawModel);
      state.estadisticaRawModel.presentacionTablaFormato = estadisticaDefaultModel.presentacionTablaFormato;
      state.hasChanges = true;
    },
    commitChanges: (state) => {
      state.estadisticaModel = { ...state.estadisticaRawModel };
      state.hasChanges = false;
    },
    setEstadisticaFields: (state, action: PayloadAction<FichaTecnicaFields>) => {
      state.estadisticaRawModel = { ...state.estadisticaRawModel, ...action.payload };
      state.titulo = action.payload.nombre || '';
      state.validationErrors = getFullValidationErrors(state.estadisticaRawModel);
      state.hasChanges = true;
    },
    setEstadisticaModel: (state, action: PayloadAction<Estadistica>) => {
      const data = action.payload;
      state.estadisticaModel = data;
      state.estadisticaRawModel = data;
      state.titulo = data.nombre || '';
      state.isCreationMode = !data.id;
      state.hasChanges = false;
    },
    validateEstadisticaFields: (state) => {
      // Validar los campos de la ficha técnica
      state.validationErrors = getFullValidationErrors(state.estadisticaRawModel);
    },
    validateEstadisticaField: (state, action: PayloadAction<{ field: keyof Estadistica, value: any }>) => {
      const fielName = action.payload.field;
      const value = action.payload.value;
      state.validationErrors = getValidationErrorsWith(fielName, value, state.validationErrors);
    },
    setEstadisticaFieldValue: (state, action: PayloadAction<{ field: keyof Estadistica, value: any }>) => {
      const fielName = action.payload.field;
      const value = action.payload.value;
      state.estadisticaRawModel = {
        ...state.estadisticaRawModel,
        [fielName]: value
      }
      // Validar campo
      state.validationErrors = getValidationErrorsWith(fielName, value, state.validationErrors);

      if (fielName === 'nombre') {
        state.titulo = action.payload.value || '';
      }
      state.hasChanges = true;
    },
    setEstadisticaDatos: (state, action: PayloadAction<Cell[][]>) => {
      const datos = action.payload;
      state.estadisticaRawModel.datos = datos;
      state.estadisticaRawModel.datosInformacion = tablaDatosHelper.getInformacion(datos || []);
      state.estadisticaRawModel.graficos = [graficoHelper.getGraficoDefecto(state.estadisticaRawModel)];
      state.validationErrors = getFullValidationErrors(state.estadisticaRawModel);
      state.hasChanges = true;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload
    },
    setTipoGrafico: (state, action: PayloadAction<{ graficoId: number, tipoGrafico: TipoGrafico }>) => {
      state.estadisticaRawModel.graficos = state.estadisticaRawModel.graficos.map((grafico) => {
        if (grafico.id === action.payload.graficoId) {
          return { ...grafico, tipo: action.payload.tipoGrafico };
        }
        return grafico;
      })
    },
    setGraficoFieldValue: (state, action: PayloadAction<{ graficoId: number, field: keyof Grafico, value: any }>) => {
      const fielName = action.payload.field
      const value = action.payload.value
      state.estadisticaRawModel.graficos = state.estadisticaRawModel.graficos.map((grafico) => {
        if (grafico.id === action.payload.graficoId) {
          return { ...grafico, [fielName]: value };
        }
        return grafico;
      })
      state.hasChanges = true;
    },
    setGraficoSerieColor: (state, action: PayloadAction<{ graficoId: number, serieIndex: number, color: string }>) => {
      const serieIndex = action.payload.serieIndex;
      const color = action.payload.color;
      state.estadisticaRawModel.graficos = state.estadisticaRawModel.graficos.map((grafico) => {
        if (grafico.id === action.payload.graficoId) {
          return {
            ...grafico,
            series: grafico.series.map((serie, index) => {
              if (index === serieIndex) {
                return { ...serie, color: color }
              }
              return serie;
            })
          }
        }
        return grafico;
      });
      state.hasChanges = true;
    },
    setGraficoDataRanges: (state, action: PayloadAction<{ graficoId: number, chartDataRanges: ChartDataRanges }>) => {
      const payload = action.payload
      state.estadisticaRawModel.graficos = state.estadisticaRawModel.graficos.map((grafico) => {
        if (grafico.id === payload.graficoId) {
          return {
            ...grafico,
            ...graficoHelper.getPropiedadesBasicasGrafico(
              state.estadisticaRawModel.datos,
              payload.chartDataRanges
            )
          }
        }
        return grafico
      })
    },
    setFieldValidationErrors: (state, action: PayloadAction<{ fieldName: string, errors: ValidationErrors }>) => {
      state.validationErrors = {
        ...state.validationErrors,
        [action.payload.fieldName]: action.payload.errors
      }
    },
    setValidationErrors: (state, action: PayloadAction<Record<string, ValidationErrors>>) => {
      state.validationErrors = action.payload;
    },
    setFormatoTablaFieldValue: (state, action: PayloadAction<{ field: keyof FormatoTabla, value: any }>) => {
      const fielName = action.payload.field;
      const value = action.payload.value;
      state.estadisticaRawModel.presentacionTablaFormato = {
        ...state.estadisticaRawModel.presentacionTablaFormato,
        [fielName]: value
      }
      state.hasChanges = true;
    },
  },
});

const getValidationErrorsWith = (fieldName: string, value: any, validationErrors: Record<string, ValidationErrors>) => {
  return validationsHelper.getGroupValidationErrorsWith(
    ESTADISTICA_FULL_FIELDS_DEF[fieldName],
    fieldName,
    value,
    validationErrors
  );
}

const getFullValidationErrors = (values: Estadistica) => {
  return Object.keys(ESTADISTICA_FULL_FIELDS_DEF).reduce((errors, fieldName) => {
    const value = values[fieldName];
    const fieldErrors = validationsHelper.getFieldErrors(ESTADISTICA_FULL_FIELDS_DEF[fieldName], value);
    if (fieldErrors) {
      return { ...errors, [fieldName]: fieldErrors };
    }
    return errors;
  }, {});
}

export const {
  setEstadisticaModel,
  resetChanges,
  resetEstadisticaModel,
  resetPresentacionChanges,
  setEstadisticaFields,
  validateEstadisticaFields,
  validateEstadisticaField,
  setEstadisticaDatos,
  setEstadisticaFieldValue,
  setActiveTab,
  setTipoGrafico,
  setGraficoFieldValue,
  setGraficoSerieColor,
  setGraficoDataRanges,
  commitChanges,
  setFormatoTablaFieldValue,
  // field validation
  setFieldValidationErrors,
  setValidationErrors
} = estadisticaFormSlice.actions;

export const selectHasChanges = (state: RootState) => state.estadisticaForm.hasChanges;
export const selectTitulo = (state: RootState) => state.estadisticaForm.titulo;
export const selectEstadisticaValues = (state: RootState): Estadistica => state.estadisticaForm.estadisticaRawModel;
export const selectFichaTecnica = (state: RootState): Estadistica => state.estadisticaForm.estadisticaRawModel;
export const selectEstadisticaDatos = (state: RootState) => state.estadisticaForm.estadisticaRawModel.datos;
export const selectIsCreationMode = (state: RootState) => state.estadisticaForm.isCreationMode;
export const selectActiveTab = (state: RootState) => state.estadisticaForm.activeTab;
export const selectPostValues = (state: RootState) => state.estadisticaForm.estadisticaRawModel;
export const selectGraficos = (state: RootState): Grafico[] => state.estadisticaForm.estadisticaRawModel.graficos;
export const selectGraficoFieldValue = <K extends keyof Grafico>(graficoId: number, field: K): ((state: RootState) => Grafico[K]) => (state: RootState) => {
  const grafico = state.estadisticaForm.estadisticaRawModel.graficos.find((grafico) => grafico.id == graficoId);
  return grafico?.[field];
}
export const selectFormatoTablaFieldValue = <K extends keyof FormatoTabla>(field: K): ((state: RootState) => FormatoTabla[K]) => (state: RootState) => {
  const formato = state.estadisticaForm.estadisticaRawModel.presentacionTablaFormato || {};
  return formato[field];
}

export const selectValidationErrors = (state: RootState) => state.estadisticaForm.validationErrors;

export default estadisticaFormSlice.reducer;
