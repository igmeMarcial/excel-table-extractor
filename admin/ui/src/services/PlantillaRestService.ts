import axios from 'axios';

class PlantillaRestService {
  static apiUrl = `${window.AesaInfo.apiUrl}/plantillas`;

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

  static list() {
    return this.handleRequest(axios.get(this.apiUrl)).then((res) => res.data);
  }

  static upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.handleRequest(axios.post(`${this.apiUrl}`, formData)).then((res) => res.data);
  }

  static delete(hash: string) {
    return this.handleRequest(axios.delete(`${this.apiUrl}/${hash}`)).then((res) => res.data);
  }
}

export default PlantillaRestService;
