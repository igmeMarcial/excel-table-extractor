import { api } from './api'
import { ApiResponse } from '../../../src/types/ApiResponse'
interface Estadistica {
  id: number
}

export const estadisticaApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEstadistica: build.query<any, number>({
      query: (id) => `estadisticas/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Estadistica', id }],
      transformResponse: (response: ApiResponse) => response.data,
    }),
    getIndice: build.query<any, number>({
      query: () => `/web/marcos-ordenadores/mdea/indice`,
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
