
import axios from 'axios';

class ClasificadorService{
     static readonly apiUrl = `${window.AesaInfo.apiUrl}/admin/marcos-ordenadores/indice-clasificadores`;

  static handleRequest(requestPromise: Promise<any>) {
    try {
      return requestPromise.then((response) => {
        return response.data;
      });
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }
  static getIndice(id: number) {
    return this.handleRequest(axios.get(`${this.apiUrl}/${id}`)).then((res) => res.data);
  }
   static update(id: number, data: any) {
    console.warn('data type is any, please update to a specific type');
    return this.handleRequest(axios.put(`${this.apiUrl}/${id}`, data)).then((res) => res.data);
  }
}
export default ClasificadorService;