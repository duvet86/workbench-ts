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
  const onChange = () => {
    return;
  };

  const component = create(
    <IntervalTypeSelector
      options={intervalTypes}
      value="DATEOP"
      onChange={onChange}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
