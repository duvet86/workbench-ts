import React from "react";

import { IConfigSteps } from "workbench/configElements/types";

export const steps: Array<IConfigSteps<any>> = [
  {
    label: "Filter On",
    renderComponent: function test() {
      return <div>Pippo</div>;
    }
  }
];
