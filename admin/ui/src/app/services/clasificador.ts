import { Clasificador } from '../../types/Clasificador'
import { CodigoMarcoOrdenador } from '../../types/CodigoMarcoOrdenador'
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
    //add methods
    getIndiceClasificadoresAll:build.query<Clasificador[],string>({
      query:(marcoOrdenador:CodigoMarcoOrdenador)=>`admin/marcos-ordenadores/${marcoOrdenador}/indice-clasificadores`,
      transformResponse:(response:ListResponse<Clasificador>)=>{
         return response.data.map((item: any) => {
                item.nivel = item.numeral.split('.').length;
                item.hasChildren = response.data.some((child: any) => {
                return child.numeral.startsWith(item.numeral + '.');
                });
                return item;
            });
      }
    })
  }),
})

export const {
  useGetIndiceClasificadoresQuery,
  useGetIndiceClasificadoresAllQuery 
} = clasificadorApi
export const {
  endpoints: { getIndiceClasificadores },
} = clasificadorApi
