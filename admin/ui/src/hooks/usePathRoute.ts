import { useLocation } from 'react-router-dom';


export const getNewPathUrl = (view, resourceId?: number | string) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  queryParams.set('view', view);
  if (resourceId) {
    queryParams.set('rid', resourceId.toString());
  }
  return '?' + queryParams.toString();
}

export const getPathResourceId = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  return queryParams.get('rid') || null;
}
