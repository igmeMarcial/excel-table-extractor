import axios from 'axios';

class IndicadorRestService {
  static apiUrl = `${AesaInfo.apiUrl}/estadisticas`;

  static handleRequest(requestPromise) {
    try {
      return requestPromise.then((response) => {
        return response.data;
      });
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  static list() {
    return this.handleRequest(axios.get(this.apiUrl)).then((res) => res.data);
  }

  static create(model) {
    return this.handleRequest(axios.post(`${this.apiUrl}`, model)).then((res) => res.data);
  }

  static update(id, data) {
    return this.handleRequest(axios.put(`${this.apiUrl}/${id}`, data)).then((res) => res.data);
  }

  static delete(hash) {
    return this.handleRequest(axios.delete(`${this.apiUrl}/${hash}`)).then((res) => res.data);
  }
}

export default IndicadorRestService;
