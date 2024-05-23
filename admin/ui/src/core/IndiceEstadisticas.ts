import { IndiceItem } from '../../src-frontpage/types/IndiceItem'

export class IndiceEstadisticas {

  constructor(private items: IndiceItem[] = []) { }

  getItems(): IndiceItem[] {
    return this.items
  }

  getItemsNivel1(): IndiceItem[] {
    return this.getItemsFromNivel(1)
  }

  getItemsNivel2(): IndiceItem[] {
    return this.getItemsFromNivel(2)
  }

  getItemsNivel3(): IndiceItem[] {
    return this.getItemsFromNivel(3)
  }

  getItemsFromNivel(nivel: number): IndiceItem[] {
    return this.items.filter(item => item.nivel === nivel)
  }
}
