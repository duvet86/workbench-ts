import React, { FC } from "react";

import { IFolderChild } from "sidebar/userItems/types";

import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import ExpandLess from "@material-ui/icons/ExpandMore";
import ExpandMore from "@material-ui/icons/KeyboardArrowRight";

import Item from "sidebar/userItems/Item";
import FolderContainer from "sidebar/userItems/FolderContainer";
import EmptyItem from "sidebar/userItems/EmptyItem";

interface IProps {
  label: string;
  handleClick: () => void;
  expanded: boolean;
  childFolders: IFolderChild[];
  nested: number;
  CutomFolderIcon?: React.ComponentType<SvgIconProps>;
  disabled?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  ellipsis: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  icon: {
    color: "#696969"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  expandIcon: {
    minWidth: theme.spacing()
  }
}));

const Folder: FC<IProps> = ({
  label,
  childFolders,
  handleClick,
  expanded,
  nested,
  CutomFolderIcon,
  disabled
}) => {
  const theme = useTheme();
  const classes = useStyles();

  const icon =
    CutomFolderIcon != null ? (
      <CutomFolderIcon className={classes.icon} />
    ) : expanded ? (
      <FolderOpenIcon className={classes.icon} />
    ) : (
      <FolderIcon className={classes.icon} />
    );

  return (
    <>
      <ListItem
        disabled={disabled}
        divider
        button
        onClick={handleClick}
        style={{ paddingLeft: nested * theme.spacing() * 2 }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={label}
          className={classes.ellipsis}
          classes={{
            primary: classes.heading
          }}
        />
        <ListItemIcon
          classes={{
            root: classes.expandIcon
          }}
        >
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List disablePadding component="nav">
          {childFolders.length === 0 ? (
            <EmptyItem nested={nested + 1} />
          ) : (
            childFolders.map(
              ({
                ChildType,
                ChildFolderId,
                ChildFolder,
                ChildItemId,
                ChildItem
              }) =>
                ChildType === "F" ? (
                  <FolderContainer
                    nested={nested + 1}
                    key={ChildFolderId}
                    label={ChildFolder.Label}
                    childFolders={ChildFolder.Children}
                  />
                ) : (
                  <Item
                    nested={nested + 1}
                    key={ChildItemId}
                    itemTypeId={ChildItem.ItemTypeId}
                    itemId={ChildItem.ItemId}
                    label={ChildItem.Label}
                  />
                )
            )
          )}
        </List>
      </Collapse>
    </>
  );
};

export default Folder;
