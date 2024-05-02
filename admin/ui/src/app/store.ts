import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'
import { api } from './services/api'
import appReducer from './AppSlice'
import estadisticaFormReducer from '../pages/estadisticas/EstadisticaFormSlice'

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined,
) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      estadisticaForm: estadisticaFormReducer,
      app: appReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    ...options,
  })

export const store = createStore()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
