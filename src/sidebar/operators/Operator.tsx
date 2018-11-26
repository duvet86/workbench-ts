import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import { OperatorServiceIds } from "workbench/types";

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
  operatorServiceId: OperatorServiceIds;
  areOperatorsEnabled: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    listItemRoot: {
      minHeight: 70,
      padding: "3px 8px 3px 16px"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
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
      border: "1px solid #ddd",
      backgroundColor: theme.palette.common.white
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
  operatorServiceId,
  areOperatorsEnabled
}) => (
  <>
    <ListItem divider classes={{ root: classes.listItemRoot }}>
      --
      {(
        operatorServiceId !== OperatorServiceIds.QUERY && !areOperatorsEnabled
      ).toString()}
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
        draggable={
          operatorServiceId !== OperatorServiceIds.QUERY && !areOperatorsEnabled
        }
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
