import { Clasificador } from "../types/Clasificador"

export class IndiceClasificadores {

  constructor(private items: Clasificador[] = []) { }

  getSubclasificadores(id: number) {
    const clasificador = this.getItemById(id)
    if (!clasificador) return []
    return this.items.filter((item) => {
      return (item.nivel === clasificador.nivel + 1) && item.numeral.startsWith(clasificador.numeral)
    })
  }
  getItemById(id): Clasificador {
    return this.items.find(item => item.id === id)
  }
  getItemsNivel1(): Clasificador[] {
    return this.items.filter(item => item.nivel === 1)
  }
  getItemIdByNumeral(numeral: string): number {
    return this.items.find(item => item.numeral === numeral).id
  }
}
