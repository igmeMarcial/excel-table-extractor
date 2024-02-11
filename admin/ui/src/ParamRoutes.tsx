import React from "react";
import { useLocation } from "react-router-dom";
type ParamRoutesProps = {
  param: string;
  children: React.ReactNode;
};
const ParamRoutes: React.FC<ParamRoutesProps> = ({ param, children }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const matchingRoute = React.Children.toArray(children).find((child) => {
    if (!React.isValidElement(child)) {
      return false;
    }

    const { value } = child.props;
    const paramValue = queryParams.get(param);

    return paramValue === value || (paramValue === null && child.props.default);
  });

  return matchingRoute || null;
};

export default ParamRoutes;
