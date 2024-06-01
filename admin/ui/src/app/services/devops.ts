import { ObjectResponse } from '../../types/ObjectResponse'
import { api } from './api'

export const devopsApi = api.injectEndpoints({
  endpoints: (build) => ({
    resetDatabase: build.mutation<any, void>({
      query: () => 'dev/reset-database',
      transformResponse: (response: ObjectResponse<any>) => response.data,
      invalidatesTags: ['Estadistica', 'MarcoOrdenador', 'Clasificador']
    }),
  }),
})

export const {
  useResetDatabaseMutation,
} = devopsApi
