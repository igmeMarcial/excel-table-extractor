import { Location } from 'react-router-dom';


export const builNavPathUrl = (location: Location<any>, view: string, resourceId?: number | string) => {
  const queryParams = new URLSearchParams(location.search);
  queryParams.set('view', view);
  if (resourceId) {
    queryParams.set('rid', resourceId.toString());
  }
  return '?' + queryParams.toString();
}

export const getPathResourceId = (location: Location<any>) => {
  const queryParams = new URLSearchParams(location.search);
  return queryParams.get('rid') || null;
}
