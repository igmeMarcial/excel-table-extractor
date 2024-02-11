const filesizehuman = (size: number) => {
  const byteLimit = 1024,
    kbLimit = 1048576,
    mbLimit = 1073741824;
  if (size < byteLimit) {
    if (size === 1) {
      return '1 byte';
    }
    return size + ' bytes';
  }
  if (size < kbLimit) {
    return (Math.round(((size * 10) / byteLimit)) / 10) + ' KB';
  }
  if (size < mbLimit) {
    return (Math.round(((size * 10) / kbLimit)) / 10) + ' MB';
  }
  return (Math.round(((size * 10) / mbLimit)) / 10) + ' GB';

}

export default filesizehuman;
