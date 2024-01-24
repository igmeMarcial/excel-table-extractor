import { useLocation } from 'react-router-dom';


export const getNewPathUrl = (tab) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  queryParams.set('tab', tab);
  return '?' + queryParams.toString();
}
