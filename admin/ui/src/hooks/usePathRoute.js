import { useLocation } from 'react-router-dom';


export const getNewPathUrl = (view) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  queryParams.set('view', view);
  return '?' + queryParams.toString();
}
