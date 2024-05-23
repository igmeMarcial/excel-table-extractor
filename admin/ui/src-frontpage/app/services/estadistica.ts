import { api } from './api'
import { ApiResponse } from '../../../src/types/ApiResponse'
import { Estadistica } from '../../types/Estadistica'
import { CodigoMarcoOrdenador } from '../../../src/types/CodigoMarcoOrdenador'

export const estadisticaApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEstadistica: build.query<Estadistica, number>({
      query: (id) => `estadisticas/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Estadistica', id }],
      transformResponse: (response: ApiResponse) => response.data,
    }),
    getIndiceEstadisticas: build.query<any, CodigoMarcoOrdenador>({
      query: (marcoOdenador: CodigoMarcoOrdenador) => `/website/marcos-ordenadores/${marcoOdenador}/indice-estadisticas`,
      transformResponse: (response: ApiResponse) => {
        return response.data.map(item => {
          item.nivel = item.numeral.split('.').length
          return item
        })
      },
    }),
  }),
})
export const {
  useGetEstadisticaQuery,
  useGetIndiceEstadisticasQuery,
} = estadisticaApi

export const {
  endpoints: { getEstadistica, getIndiceEstadisticas },
} = estadisticaApi
