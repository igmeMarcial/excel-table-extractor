import { api } from './api'
import { ApiResponse } from '../../../src/types/ApiResponse'
import { Estadistica } from '../../types/Estadistica'

export const estadisticaApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEstadistica: build.query<Estadistica, number>({
      query: (id) => `estadisticas/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Estadistica', id }],
      transformResponse: (response: ApiResponse) => response.data,
    }),
    getIndice: build.query<any, number>({
      query: () => `/website/marcos-ordenadores/mdea/indice-estadisticas`,
      transformResponse: (response: ApiResponse) => response.data,
    }),
  }),
})
export const {
  useGetEstadisticaQuery,
  useGetIndiceQuery,
} = estadisticaApi

export const {
  endpoints: { getEstadistica, getIndice },
} = estadisticaApi
