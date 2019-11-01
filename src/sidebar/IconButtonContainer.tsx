import React, { FC, useState } from "react";

import IconButton from "sidebar/IconButton";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

interface IProps {
  Icon: React.ComponentType<SvgIconProps>;
  link: string;
  label: string;
}

const IconButtonContainer: FC<IProps> = ({ Icon, link, label }) => {
  const [visible, setVisible] = useState(false);

  const handlePopoverOpen = () => {
    setVisible(true);
  };

  const handlePopoverClose = () => {
    setVisible(false);
  };

  return (
    <IconButton
      visible={visible}
      Icon={Icon}
      to={link}
      label={label}
      handlePopoverOpen={handlePopoverOpen}
      handlePopoverClose={handlePopoverClose}
    />
  );
};

export default IconButtonContainer;
