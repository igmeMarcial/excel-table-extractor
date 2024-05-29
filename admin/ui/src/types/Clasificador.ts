export interface Clasificador {
  id: number
  numeral: string
  nombre: string
  nivel: number
}

export interface ClasificadorMarcoOrdenador {
    clasificador_id: number;
    usuario_reg_id: number;
    usuario_mod_id: number;
    fecha_reg: string;
    fecha_mod: string;
    activo: number;
    marco_ordenador_id: number;
    nivel: number;
    numeral: string;
    nombre: string;
}
