// Verifica que las variables globales necesarias estén definidas

// AesaInfo contiene parametros de configuración de la aplicación provenientes del backend
if (!window.AesaInfo) {
  throw new Error('AesaInfo not found in window')
}
console.log('checked globals:')
export { }
