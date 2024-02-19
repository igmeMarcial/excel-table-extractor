import axios from 'axios';

class CatalogoRestService {
  static readonly apiUrl = window.AesaInfo.apiUrl;

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

  static listComponentes() {
    const url = `${this.apiUrl}/componentes`;
    return this.handleRequest(axios.get(url)).then((res) => res.data);
  }

}

export default CatalogoRestService;
