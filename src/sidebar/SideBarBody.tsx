import React, { FC } from "react";

import { styled } from "@material-ui/core/styles";

interface IProps {
  tabRenderer: () => JSX.Element;
}

const StyledDiv = styled("div")({
  bodyContainer: {
    height: "100%",
    display: "flex"
  }
});

const SideBarBody: FC<IProps> = ({ tabRenderer }) => (
  <StyledDiv>{tabRenderer()}</StyledDiv>
);

export default SideBarBody;
