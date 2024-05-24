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

  getPrimeraEstadistica(): IndiceItem {
    console.log('No implementado')
    return null
  }

  getDirectChildren(parentItem: IndiceItem): IndiceItem[] {
    return this.items.filter((item) => {
      const regexp = new RegExp(`^${parentItem.numeral}\\.`);
      return regexp.test(item.numeral) && item.nivel === parentItem.nivel + 1;
    });
  }

  getItemsFromNivel(nivel: number): IndiceItem[] {
    return this.items.filter(item => item.nivel === nivel)
  }

  getItemsForSideNav(items: IndiceItem[], clasificadorNivel1: string): IndiceItem[] {
    return items.map((item) => {
      let newItem = { ...item };
      newItem.expanded = false;
      if (
        newItem.nivel === 2 &&
        newItem.numeral.split('.')[0] === clasificadorNivel1
      ) {
        newItem.visible = true;
      } else {
        newItem.visible = false;
      }
      return newItem;
    })
  }
}
