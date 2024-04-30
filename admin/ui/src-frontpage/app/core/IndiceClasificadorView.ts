import { Clasificador } from "../../../src/types/Clasificador";

export class IndiceClasificadoresWeb {
constructor(private items: Clasificador[] = []) { }

 getSubclasificadores(id: string) {
    console.log("_______________")
    console.log(id)
    const clasificador = this.getItemByNumeral(id);
    if (!clasificador) return [];
    return this.items.filter((item) => {
      return (
        item.nivel === clasificador.nivel + 1 &&
        item.numeral.startsWith(clasificador.numeral)
      );
    });
  }
  getItemByNumeral(id): Clasificador {
    return this.items.find((item) => item.id === id);
  }
  getItemsNivel1(): Clasificador[] {
    return this.items.filter(item => item.nivel === 1)
  }
}