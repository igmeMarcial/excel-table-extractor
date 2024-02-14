import { ReactElement } from 'react';

type ParamRouteProps = {
  value?: string;
  element: ReactElement;
  default?: boolean;
};

const ParamRoute = ({ element }: ParamRouteProps) => {
  return element;
};

export default ParamRoute;
