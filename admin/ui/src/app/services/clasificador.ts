import { api, ApiResponse } from './api'

export const clasificadorApi = api.injectEndpoints({
  endpoints: (build) => ({
    getIndiceClasificadores: build.query<any, void>({
      query: () => `admin/marcos-ordenadores/mdea/indice-clasificadores`,
      transformResponse: (response: ApiResponse) => response.data,
    }),
  }),
})

export const {
  useGetIndiceClasificadoresQuery
} = clasificadorApi

export const {
  endpoints: { getIndiceClasificadores },
} = clasificadorApi
