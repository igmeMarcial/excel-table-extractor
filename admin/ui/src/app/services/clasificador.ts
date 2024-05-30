import { Clasificador } from '../../types/Clasificador'
import { ListResponse } from '../../types/ListResponse'
import { api } from './api'

const ENPOINTS_BASE_URL = 'admin/clasificadores';

export const clasificadorApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Registrar
    createClasificador: build.mutation<Clasificador, Partial<Clasificador>>({
      query(body) {
        return {
          url: ENPOINTS_BASE_URL,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Clasificador', id: 'LIST' }],
    }),
    // Actualizar
    updateClasificador: build.mutation<Clasificador, Partial<Clasificador>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `${ENPOINTS_BASE_URL}/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: (post) => [{ type: 'Clasificador', id: post?.id }],
    }),
    // Eliminar
    deleteClasificador: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `${ENPOINTS_BASE_URL}/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (post) => [{ type: 'Clasificador', id: post?.id }],
    }),
    // TODO: Mover a marco-ordenador service
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
// Add/Update
export const useSaveClasificadorMutation = (creating: boolean) => {
  if (creating) {
    return useCreateClasificadorMutation()
  } else {
    return useUpdateClasificadorMutation()
  }
}
export const {
  useGetIndiceClasificadoresQuery,
  useCreateClasificadorMutation,
  useUpdateClasificadorMutation,
  useDeleteClasificadorMutation,
} = clasificadorApi
export const {
  endpoints: { getIndiceClasificadores },
} = clasificadorApi
