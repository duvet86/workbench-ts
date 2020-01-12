import React, { FC, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { IFolderChild } from "sidebar/userItems/types";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

import Folder from "sidebar/userItems/Folder";

interface IProps {
  label: string;
  childFolders: IFolderChild[];
  nested: number;
  initExpanded?: boolean;
  CutomFolderIcon?: React.ComponentType<SvgIconProps>;
  disabled?: boolean;
}

const FolderContainer: FC<IProps> = ({ initExpanded, ...rest }) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(initExpanded || false);

  useEffect(() => {
    if (!rest.childFolders || rest.childFolders.length === 0) {
      return;
    }

    const match = rest.childFolders.some(
      c =>
        c.ChildType === "I" &&
        (`/workbench/${c.ChildItemId}` === location.pathname ||
          `/pagebuilder/${c.ChildItemId}` === location.pathname)
    );

    if (match) {
      setExpanded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setExpanded(prevState => !prevState);
  };

  return <Folder handleClick={handleClick} expanded={expanded} {...rest} />;
};

export default FolderContainer;
