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
    getIndiceMdea: build.query<any, number>({
      query: () => `/website/marcos-ordenadores/mdea/indice-estadisticas`,
      transformResponse: (response: ApiResponse) => response.data,
    }),
    getIndiceOds: build.query<any, number>({
      query: () => `/website/marcos-ordenadores/ods/indice-estadisticas`,
      transformResponse: (response: ApiResponse) => response.data,
    }),
    getIndiceOcde: build.query<any, number>({
      query: () => `/website/marcos-ordenadores/ocde/indice-estadisticas`,
      transformResponse: (response: ApiResponse) => response.data,
    }),
    getIndicePna: build.query<any, number>({
      query: () => `/website/marcos-ordenadores/pna/indice-estadisticas`,
      transformResponse: (response: ApiResponse) => response.data,
    }),
  }),
})
export const {
  useGetEstadisticaQuery,
  useGetIndiceMdeaQuery,
  useGetIndiceOdsQuery,
  useGetIndiceOcdeQuery,
  useGetIndicePnaQuery,
} = estadisticaApi

export const {
  endpoints: { getEstadistica, getIndiceMdea },
} = estadisticaApi
