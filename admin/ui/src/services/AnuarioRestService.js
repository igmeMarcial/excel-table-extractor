import axios from 'axios';

class AnuarioRestService {
  static apiUrl = `${AesaInfo.apiUrl}/anuarios`;

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

  static upload(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.handleRequest(axios.post(`${this.apiUrl}`, formData)).then((res) => res.data);
  }
  static generarVersionBase() {
    return this.handleRequest(axios.post(`${this.apiUrl}:generar-version-base`, null)).then((res) => res.data);
  }
  static delete(hash) {
    return this.handleRequest(axios.delete(`${this.apiUrl}/${hash}`)).then((res) => res.data);
  }
  static download(hash) {
    return this.handleRequest(axios.get(`${this.apiUrl}/${hash}:descargar`)).then((res) => res.data);
  }
  static getDownloadUrl(hash) {
    return `${this.apiUrl}/${hash}:descargar`;
  }
}

export default AnuarioRestService;
