import { ReactElement } from "react";

type ParamRouteProps = {
  value?: string;
  element: ReactElement;
  default?: boolean;
};

const ParamRoute: React.FC<ParamRouteProps> = ({ element }) => {
  return element;
};

export default ParamRoute;
