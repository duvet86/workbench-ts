import React, { FC } from "react";

import { makeStyles } from "@material-ui/core/styles";

import AppBody from "appBody/AppBody";
import SideBar from "sidebar/SideBar";
import TopBarContainer from "topbar/TopBarContainer";

interface IProps {
  handleDrawerOpen: () => void;
  open: boolean;
  isQesEnabled: boolean;
}

const useStyles = makeStyles({
  bodyContainer: {
    display: "flex",
    height: "100%",
    width: "100%"
  }
});

const App: FC<IProps> = ({ handleDrawerOpen, open, isQesEnabled, ...rest }) => {
  const classes = useStyles();

  return isQesEnabled ? (
    <>
      <TopBarContainer handleDrawerOpen={handleDrawerOpen} />
      <div className={classes.bodyContainer}>
        <SideBar open={open} {...rest} />
        <AppBody />
      </div>
    </>
  ) : (
    <div>Workbench features are not enabled.</div>
  );
};

export default App;
