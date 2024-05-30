import { Clasificador } from '../../types/Clasificador'
import { ListResponse } from '../../types/ListResponse'
import { MarcoOrdenador } from '../../types/MarcoOrdenador'
import { api } from './api'

export const marcoOrdenadorApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Lista de marcos ordenadores
    getMarcosOrdenadores: build.query<MarcoOrdenador[], void>({
      query: () => ({ url: 'admin/marcos-ordenadores' }),
      /**
       * Notar qué el tagType: MarcoOrdenador está definido primero en api.ts:tagTypes
       *
       * Ver: https://redux-toolkit.js.org/rtk-query/api/createApi#providestags
       */
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'MarcoOrdenador' as const, id })),
        { type: 'MarcoOrdenador' as const, id: 'LIST' },
      ],
      transformResponse: (response: ListResponse<MarcoOrdenador>) => response.data
    }),
    // Clasificadores del marco ordenador
    getClasificadoresByMarcoOrdenadorId: build.query<Clasificador[], number>({
      query: (id) => `admin/marcos-ordenadores/${id}/clasificadores`,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Clasificador' as const, id })),
        { type: 'Clasificador' as const, id: 'LIST' },
      ],
      transformResponse: (response: ListResponse<Clasificador>) => response.data,
    }),
  }),
})

export const {
  useGetMarcosOrdenadoresQuery,
  useGetClasificadoresByMarcoOrdenadorIdQuery,
} = marcoOrdenadorApi
