import React from "react";

import { IConfigSteps } from "workbench/configElements/types";

export const steps: Array<IConfigSteps<any>> = [
  {
    label: "Filter On",
    renderComponent: () => <div>Pippo</div>
  }
];
