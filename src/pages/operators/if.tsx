import React from 'react';

type Props = {
  condition: boolean;
};

const If: React.FC<React.PropsWithChildren<Props>> = ({
  condition,
  children,
}: React.PropsWithChildren<Props>) => {
  if (condition) {
    return <>{children}</>;
  }
  return null;
};

export default If;
