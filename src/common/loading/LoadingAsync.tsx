import PropTypes from "prop-types";
import React from "react";
import { LoadingComponentProps } from "react-loadable";

import BaseLoading from "common/loading/BaseLoading";

const LoadingAsync: React.StatelessComponent<LoadingComponentProps> = ({
  error,
  pastDelay,
  timedOut
}) => {
  if (error) {
    // When the loader has errored
    return <div>{JSON.stringify(error)}</div>;
  }
  if (timedOut) {
    // When the loader has taken longer than the timeout
    return <div>Taking a long time...</div>;
  }
  if (pastDelay) {
    // When the loader has taken longer than the delay or is loading
    return <BaseLoading />;
  }

  // When the loader has just started
  return null;
};

LoadingAsync.propTypes = {
  error: PropTypes.object,
  pastDelay: PropTypes.bool.isRequired,
  timedOut: PropTypes.bool.isRequired
};

export default LoadingAsync;
