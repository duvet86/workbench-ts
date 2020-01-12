import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { IClearToken, clearToken } from "app/actions";

import TopBar from "topbar/TopBar";

interface IOwnProps {
  handleDrawerOpen: () => void;
}

type Props = IOwnProps & ReturnType<typeof mapDispatchToProps>;

const TopBarContainer: FC<Props> = ({
  handleDrawerOpen,
  dispatchClearToken
}) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>();

  const onMenuClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuCloseHandler = () => setAnchorEl(undefined);

  const onWelcomePageClickHandler = () => {
    onMenuCloseHandler();
    history.push("/");
  };

  const onProfileClickHandler = () => {
    onMenuCloseHandler();
    history.push("/profile");
  };

  const onLogoutClickHandler = () => {
    onMenuCloseHandler();
    dispatchClearToken();
  };

  return (
    <TopBar
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      handleDrawerOpen={handleDrawerOpen}
      onMenuClickHandler={onMenuClickHandler}
      onMenuCloseHandler={onMenuCloseHandler}
      onWelcomePageClickHandler={onWelcomePageClickHandler}
      onProfileClickHandler={onProfileClickHandler}
      onLogoutClickHandler={onLogoutClickHandler}
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IClearToken>) => ({
  dispatchClearToken: () => {
    dispatch(clearToken());
  }
});

export default connect(undefined, mapDispatchToProps)(TopBarContainer);
