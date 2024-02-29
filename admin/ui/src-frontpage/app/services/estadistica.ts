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
  }),
})
export const {
  useGetEstadisticaQuery,
} = estadisticaApi

export const {
  endpoints: { getEstadistica },
} = estadisticaApi
