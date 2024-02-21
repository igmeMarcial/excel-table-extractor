import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getEstadistica } from '../../app/services/estadistica';
import type { RootState } from '../../app/store';


// Tab ficha
interface EstadisticaFields {
  nombre?: string;
  componenteId?: number;
  subcomponenteId?: number;
}

// Tab datos
interface EstadisticaDataFields {
  data?: any[];
  nombre?:string;
  nota?:string;
  fuente?:string;
  elaboracion?:string;
}
interface ExcelData {
    sheetData: EstadisticaDataFields;
    tableData: Array<Array<string | number>>;
}
interface EstadisticaFormState {
  // Indicar si hay cambios en el formulario
  hasChanges: boolean;
  isCreationMode: boolean;
  titulo: string;
  estadisticaFields: EstadisticaFields;
  estadisticaDataFields: EstadisticaDataFields;
  activeTab:string;
  estadisticaExcelDataTable:ExcelData;
  estadisticaExcelIndicator:string[][];
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
    nombre:'',
    nota:'',
    fuente:'',
    elaboracion:''
  },
   activeTab:"1",
   estadisticaExcelDataTable:{
    sheetData:{},
    tableData:[],
   },
   estadisticaExcelIndicator: []

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
    setActiveTab:(state,action :PayloadAction<string>)=>{
      state.activeTab = action.payload
    },
    setEstadisticaExcelDataTable:(state,action:PayloadAction<ExcelData>)=>{
      state.estadisticaExcelDataTable = action.payload
    },
    setEstadisticaExcelIndicator:(state,action:PayloadAction<string[][]>)=>{
      state.estadisticaExcelIndicator = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(getEstadistica.matchFulfilled, (state, action) => {
      state.estadisticaFields = action.payload;
    })
  },
});

export const {
  setHasChanges,
  changeToUpdatingMode,
  setEstadisticaFields,
  setEstadisticaDataFields,
  setActiveTab,
  setEstadisticaExcelDataTable,
  setEstadisticaExcelIndicator
} = estadisticaFormSlice.actions;

export const selectHasChanges = (state: RootState) => state.estadisticaForm.hasChanges;
export const selectTitulo = (state: RootState) => state.estadisticaForm.titulo;
export const selectEstadisticaFields = (state: RootState) => state.estadisticaForm.estadisticaFields;
export const selectEstadisticaDataFields = (state: RootState) => state.estadisticaForm.estadisticaDataFields;
export const selectIsCreationMode = (state: RootState) => state.estadisticaForm.isCreationMode;
export const selectActiveTab = (state:RootState)=> state.estadisticaForm.activeTab;
export const selectExcelTable =(state:RootState)=>state.estadisticaForm.estadisticaExcelDataTable ;
export const selectExcelIndicator =(state:RootState)=>state.estadisticaForm.estadisticaExcelIndicator ;
export default estadisticaFormSlice.reducer;
