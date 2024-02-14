import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
type ParamRoutesProps = {
  param: string;
  children: React.ReactNode;
};
const ParamRoutes = ({
  param,
  children,
}: ParamRoutesProps): ReactElement<any, any> => {
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

  return (matchingRoute as React.ReactElement<any, any>) || null;
};

export default ParamRoutes;
