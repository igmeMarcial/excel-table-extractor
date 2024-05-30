import { Estadistica } from '../../types/Estadistica'
import { ListResponse } from '../../types/ListResponse'
import { ObjectResponse } from '../../types/ObjectResponse'
import { api } from './api'

export const estadisticaApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEstadisticas: build.query<Estadistica[], void>({
      query: () => ({ url: 'estadisticas' }),
      /**
       * Notar que el tag 'Estadistica' está definido primero en api.ts:tagTypes
       *
       * Ver: https://redux-toolkit.js.org/rtk-query/api/createApi#providestags
       */
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Estadistica' as const, id })),
        { type: 'Estadistica' as const, id: 'LIST' },
      ],
      transformResponse: (response: ListResponse<Estadistica>) => response.data
    }),
    createEstadistica: build.mutation<Estadistica, Partial<Estadistica>>({
      query(body) {
        return {
          url: 'estadisticas',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Estadistica'],
    }),
    getEstadistica: build.query<Estadistica, number>({
      query: (id) => `estadisticas/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Estadistica', id }],
      transformResponse: (response: ObjectResponse<Estadistica>) => response.data,
    }),
    updateEstadistica: build.mutation<Estadistica, Partial<Estadistica>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `estadisticas/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: (post) => [{ type: 'Estadistica', id: post?.id }],
    }),
    deleteEstadistica: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `estadisticas/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (post) => [{ type: 'Estadistica', id: post?.id }],
    }),
  }),
})
// Add/Update
export const useSaveEstadisticaMutation = (creating: boolean) => {
  if (creating) {
    return useCreateEstadisticaMutation()
  } else {
    return useUpdateEstadisticaMutation()
  }
}
export const {
  useGetEstadisticasQuery,
  useCreateEstadisticaMutation,
  useDeleteEstadisticaMutation,
  useGetEstadisticaQuery,
  useLazyGetEstadisticaQuery,
  useUpdateEstadisticaMutation,
} = estadisticaApi

export const {
  endpoints: { getEstadistica, createEstadistica: addEstadistica, updateEstadistica, deleteEstadistica },
} = estadisticaApi
