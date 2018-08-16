import React from "react";
import { create } from "react-test-renderer";

import IntervalTypeSelector from "common/intervalSelector/IntervalTypeSelector";

test("Test", () => {
  const intervalTypes = [
    {
      IntervalType: "IntervalType",
      Label: "Label",
      SmartIntervals: [{ Key: "SmartIntervals" }]
    }
  ];
  const interval = {
    type: "type",
    string: "string"
  };
  const onChange = () => {
    return;
  };

  const component = create(
    <IntervalTypeSelector
      intervalTypes={intervalTypes}
      interval={interval}
      onChange={onChange}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
