import React, { SFC, Suspense } from "react";

import BaseLoading from "common/loading/BaseLoading";

const LoadAsync: SFC = ({ children }) => {
  return <Suspense fallback={<BaseLoading />}>{children}</Suspense>;
};

export default LoadAsync;
