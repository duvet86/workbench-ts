import React, { Fragment, SFC } from "react";

import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceSpec
} from "react-dnd";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

import { itemType } from "sidebar/operators/operatorsData";

interface IProps extends WithStyles<typeof styles> {
  label: string;
  description: string;
  backgroundColor: string;
  IconComponent: React.ComponentType<SvgIconProps>;
}

interface IHandleProps {
  connectDragSource: ConnectDragSource;
  type: string;
  operatorServiceId: string;
  backgroundColor: string;
  IconComponent: React.ComponentType<SvgIconProps>;
  className: string;
}

interface IDragObject {
  type: string;
  operatorServiceId: string;
}

const operatorSource: DragSourceSpec<IHandleProps, IDragObject> = {
  beginDrag({ type, operatorServiceId }) {
    return {
      type,
      operatorServiceId
    };
  }
};

const collect = (connect: DragSourceConnector) => ({
  connectDragSource: connect.dragSource()
});

const styles = ({ typography }: Theme) =>
  createStyles({
    listItemRoot: {
      minHeight: 70,
      paddingTop: 3,
      paddingBottom: 3
    },
    heading: {
      fontSize: typography.pxToRem(15),
      fontWeight: typography.fontWeightRegular
    },
    avatarContainer: {
      cursor: "pointer",
      padding: 8,
      borderRadius: 5,
      "&:hover": {
        border: "1px solid #003b86"
      }
    }
  });

const Handle = ({
  connectDragSource,
  className,
  backgroundColor,
  IconComponent
}: IHandleProps) =>
  connectDragSource(
    <span className={className}>
      <Avatar
        style={{
          backgroundColor
        }}
      >
        <IconComponent />
      </Avatar>
    </span>
  );

const DndHandle = DragSource(itemType.OPERATOR, operatorSource, collect)(
  Handle
);

// {...props as any} is a workaround for react dnd.
const Operator: SFC<IProps> = ({ classes, label, description, ...props }) => (
  <Fragment>
    <ListItem classes={{ root: classes.listItemRoot }}>
      <ListItemText
        primary={label}
        secondary={description}
        classes={{
          primary: classes.heading
        }}
      />
      <DndHandle className={classes.avatarContainer} {...props as any} />
    </ListItem>
    <Divider />
  </Fragment>
);

export default withStyles(styles)(Operator);
