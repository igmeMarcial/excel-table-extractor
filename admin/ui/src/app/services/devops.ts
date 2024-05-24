import { ObjectResponse } from '../../types/ObjectResponse'
import { api } from './api'

export const devopsApi = api.injectEndpoints({
  endpoints: (build) => ({
    resetDatabase: build.query<any, void>({
      query: () => 'dev/reset-database',
      transformResponse: (response: ObjectResponse<any>) => response.data,
    }),
  }),
})

export const {
  useLazyResetDatabaseQuery,
} = devopsApi
