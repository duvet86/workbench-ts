import React, { FC } from "react";

import { styled } from "@material-ui/core/styles";

import linksList from "common/linksList";
import { HomeIcon } from "common/icons";
import IconButtonContainer from "sidebar/IconButtonContainer";

const StyledDiv = styled("div")({
  width: 50
});

const NavButtons: FC = () => (
  <StyledDiv>
    <IconButtonContainer Icon={HomeIcon} link="/" label="Home Page" />
    {linksList.map(({ id, IconComponent, to, label }) => (
      <IconButtonContainer
        key={id}
        Icon={IconComponent}
        link={to}
        label={label}
      />
    ))}
  </StyledDiv>
);

export default NavButtons;
