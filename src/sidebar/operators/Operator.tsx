import React, { Fragment, SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { SvgIconProps } from "@material-ui/core/SvgIcon";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

interface IProps extends WithStyles<typeof styles> {
  label: string;
  description?: string;
  backgroundColor: string;
  IconComponent: React.ComponentType<SvgIconProps>;
  operatorServiceId: string;
}

const styles = ({ typography }: Theme) =>
  createStyles({
    listItemRoot: {
      minHeight: 70,
      padding: "3px 8px 3px 16px"
    },
    heading: {
      fontSize: typography.pxToRem(15),
      fontWeight: typography.fontWeightRegular
    },
    description: {
      whiteSpace: "initial"
    },
    avatarContainer: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      padding: 8,
      borderRadius: 5,
      border: "1px solid #ddd"
    }
  });

const handleDrag = (operatorServiceId: string) => (
  event: React.DragEvent<HTMLDivElement>
) => {
  event.dataTransfer.setData("ELEMENT", operatorServiceId);
};

const Operator: SFC<IProps> = ({
  classes,
  label,
  description,
  IconComponent,
  backgroundColor,
  operatorServiceId
}) => (
  <>
    <ListItem divider classes={{ root: classes.listItemRoot }}>
      <ListItemText
        primary={label}
        secondary={description}
        classes={{
          primary: classes.heading,
          secondary: classes.description
        }}
      />
      <div
        className={classes.avatarContainer}
        draggable={true}
        onDragStart={handleDrag(operatorServiceId)}
      >
        <ListItemIcon>
          <DragIndicatorIcon />
        </ListItemIcon>
        <Avatar
          style={{
            backgroundColor
          }}
        >
          <IconComponent />
        </Avatar>
      </div>
    </ListItem>
  </>
);

export default withStyles(styles)(Operator);
