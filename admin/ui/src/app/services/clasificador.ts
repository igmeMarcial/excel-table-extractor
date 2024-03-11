import { Clasificador } from '../../types/Clasificador'
import { ListResponse } from '../../types/ListResponse'
import { api } from './api'

export const clasificadorApi = api.injectEndpoints({
  endpoints: (build) => ({
    getIndiceClasificadores: build.query<Clasificador[], void>({
      query: () => `admin/marcos-ordenadores/mdea/indice-clasificadores`,
      transformResponse: (response: ListResponse<Clasificador>) => {
        return response.data.map(item => {
          item.nivel = item.numeral.split('.').length
          return item
        })
      },
    }),
  }),
})

export const {
  useGetIndiceClasificadoresQuery
} = clasificadorApi
export const {
  endpoints: { getIndiceClasificadores },
} = clasificadorApi
