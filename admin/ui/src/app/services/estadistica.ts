import { Estadistica } from '../../types/Estadistica'
import { ObjectResponse } from '../../types/ObjectResponse'
import { api } from './api'

export const estadisticaApi = api.injectEndpoints({
  endpoints: (build) => ({
    addEstadistica: build.mutation<Estadistica, Partial<Estadistica>>({
      query(body) {
        return {
          url: `estadisticas`,
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
  console.log('creating::', creating)
  if (creating) {
    return useAddEstadisticaMutation()
  } else {
    return useUpdateEstadisticaMutation()
  }
}
export const {
  useAddEstadisticaMutation,
  useDeleteEstadisticaMutation,
  useGetEstadisticaQuery,
  useUpdateEstadisticaMutation,
} = estadisticaApi

export const {
  endpoints: { getEstadistica, addEstadistica, updateEstadistica, deleteEstadistica },
} = estadisticaApi
