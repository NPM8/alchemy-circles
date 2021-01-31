import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';

const TitleComponent = () => {
  const { pathname } = useLocation();
  const { push } = useHistory();

  useEffect(() => {
    if (pathname.includes('index.html')) push('/');
  }, [pathname, push]);

  return <div className="logo">ALCHEMY CIRCLE CREATOR</div>;
};

export default TitleComponent;
