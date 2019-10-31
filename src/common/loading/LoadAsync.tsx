import React, { FC, Suspense } from "react";

import BaseLoading from "common/loading/BaseLoading";

const LoadAsync: FC = ({ children }) => {
  return <Suspense fallback={<BaseLoading />}>{children}</Suspense>;
};

export default LoadAsync;
