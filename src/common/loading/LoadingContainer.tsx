import React, { FC, useState, useEffect, useRef } from "react";

import { usePrevious } from "lib/hooksHelper";

import Loading from "common/loading/Loading";
import BackgroundLoading from "common/loading/BackgroundLoading";

interface IProps {
  isLoading: boolean;
  error?: unknown;
  background?: boolean;
}

const LoadingContainer: FC<IProps> = ({
  error,
  isLoading,
  background,
  children
}) => {
  const [pastDelay, setPastDelay] = useState(false);
  const prevIsLoading = usePrevious(isLoading);
  const delayRef = useRef<number | undefined>();

  useEffect(() => {
    if (isLoading) {
      delayRef.current = window.setTimeout(() => {
        setPastDelay(true);
      }, 200);
    }

    return () => clearTimeout(delayRef.current);
  }, []);

  useEffect(() => {
    if (!isLoading && pastDelay) {
      setPastDelay(false);
    }
    if (prevIsLoading === false && isLoading && !pastDelay) {
      delayRef.current = window.setTimeout(() => {
        setPastDelay(true);
      }, 200);
    }
  }, [isLoading, pastDelay, prevIsLoading]);

  return background ? (
    <BackgroundLoading isLoading={isLoading} pastDelay={pastDelay}>
      {children}
    </BackgroundLoading>
  ) : (
    <Loading isLoading={isLoading} pastDelay={pastDelay} error={error}>
      {children}
    </Loading>
  );
};

export default LoadingContainer;
