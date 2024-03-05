export interface IndiceItem {
  id?: number;
  padreId?: number;
  numeracion?: string;
  nombre?: string;
  hijos?: IndiceItem[];
}
