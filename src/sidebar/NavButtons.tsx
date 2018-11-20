import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import linksList from "common/linksList";
import { HomeIcon } from "common/icons";
import IconButtonContainer from "sidebar/IconButtonContainer";

const styles = createStyles({
  buttonsContainer: {
    width: 50
  }
});

const NavButtons: SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <div className={classes.buttonsContainer}>
    <IconButtonContainer Icon={HomeIcon} link="/" label="Home Page" />
    {linksList.map(({ id, IconComponent, to, label }) => (
      <IconButtonContainer
        key={id}
        Icon={IconComponent}
        link={to}
        label={label}
      />
    ))}
  </div>
);

export default withStyles(styles)(NavButtons);
