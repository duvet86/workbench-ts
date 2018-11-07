import React, { SFC } from "react";

import TextField from "@material-ui/core/TextField";

const Summary: SFC = () => (
  <div>
    <TextField
      fullWidth
      label="Query Label"
      value="Cycle"
      placeholder="Query Label"
    />
  </div>
);

export default Summary;
