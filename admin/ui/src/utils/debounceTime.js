function debounceTime(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    const context = this;
    console.log('debounceTimeE', args);
    timeoutId = setTimeout(() => {
      console.log('debounceTimeS', args);
      func.apply(context, args);
    }, delay);
  };
}

export default debounceTime;
