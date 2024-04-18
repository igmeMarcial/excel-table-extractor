import { Cell } from '../../types/Cell'
import { FormatoTabla } from './FormatoTabla'

export interface TablaDatosProps {
  titulo: string
  tabla: Cell[][]
  nota?: string
  fuente: string
  formato?: FormatoTabla
}
