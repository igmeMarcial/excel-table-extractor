import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store';

interface EstadisticaFields {
  nombre?: string;
}
interface EstadisticaDataFields {
  data: any[];
}

interface EstadisticaFormState {
  // Indicar si hay cambios en el formulario
  hasChanges: boolean;
  isCreationMode: boolean;
  titulo: string;
  estadisticaFields: EstadisticaFields;
  estadisticaDataFields: EstadisticaDataFields;
}

const initialState: EstadisticaFormState = {
  hasChanges: false,
  isCreationMode: true,
  titulo: '',
  estadisticaFields: {
    nombre: '',
  },
  estadisticaDataFields: {
    data: [],
  },
};

export const estadisticaFormSlice = createSlice({
  name: 'estadisticaForm',
  initialState,
  reducers: {
    setHasChanges: (state, action: PayloadAction<boolean>) => {
      state.hasChanges = action.payload;
    },
    changeToUpdatingMode: (state) => {
      state.isCreationMode = false;
    },
    setEstadisticaFields: (state, action: PayloadAction<EstadisticaFields>) => {
      state.estadisticaFields = action.payload;
      state.hasChanges = true;
      state.titulo = action.payload.nombre || '';
    },
    setEstadisticaDataFields: (state, action: PayloadAction<EstadisticaDataFields>) => {
      state.estadisticaDataFields = action.payload;
      state.hasChanges = true;
    },
  },
});

export const {
  setHasChanges,
  changeToUpdatingMode,
  setEstadisticaFields,
  setEstadisticaDataFields,
} = estadisticaFormSlice.actions;

export const selectHasChanges = (state: RootState) => state.estadisticaForm.hasChanges;
export const selectTitulo = (state: RootState) => state.estadisticaForm.titulo;
export const selectEstadisticaFields = (state: RootState) => state.estadisticaForm.estadisticaFields;
export const selectEstadisticaDataFields = (state: RootState) => state.estadisticaForm.estadisticaDataFields;
export const selectIsCreationMode = (state: RootState) => state.estadisticaForm.isCreationMode;
export default estadisticaFormSlice.reducer;
