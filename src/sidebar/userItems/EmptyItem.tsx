import React, { FC } from "react";
import { useTheme, styled } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import BlockIcon from "@material-ui/icons/Block";

interface IProps {
  nested: number;
}

const StyledListItemText = styled(ListItemText)({ fontStyle: "italic" });

const EmptyItem: FC<IProps> = ({ nested }) => {
  const theme = useTheme();

  return (
    <ListItem dense style={{ paddingLeft: nested * theme.spacing() * 2 }}>
      <ListItemIcon>
        <BlockIcon />
      </ListItemIcon>
      <StyledListItemText primary="Empty" />
    </ListItem>
  );
};

export default EmptyItem;
