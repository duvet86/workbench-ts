import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { QesEnabledAction, qesEnabledRequest } from "app/actions";

import App from "app/App";
import LoadingContainer from "common/loading/LoadingContainer";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const AppContainer: FC<Props> = ({ isLoading, ...rest }) => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <LoadingContainer isLoading={isLoading}>
      <App {...rest} open={open} handleDrawerOpen={handleDrawerOpen} />
    </LoadingContainer>
  );
};

const mapStateToProps = ({ app: { isLoading, isQesEnabled } }: RootState) => ({
  isLoading,
  isQesEnabled
});

const mapDispatchToProps = (dispatch: Dispatch<QesEnabledAction>) => ({
  dispatchQesEnabledRequest: () => {
    dispatch(qesEnabledRequest());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
