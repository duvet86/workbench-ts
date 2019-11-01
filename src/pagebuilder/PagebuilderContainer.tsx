import React, { ChangeEvent, FC, useState } from "react";

import Pagebuilder from "pagebuilder/Pagebuilder";

const PagebuilderContainer: FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: ChangeEvent<{}>, value: number) => {
    setValue(value);
  };

  return <Pagebuilder value={value} handleChange={handleChange} />;
};

export default PagebuilderContainer;
