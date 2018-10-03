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
    IntervalType: "type",
    IntervalString: "string",
    offset: 0
  };
  const onChange = () => {
    return;
  };

  const component = create(
    <IntervalTypeSelector
      isLoading={false}
      intervalTypes={intervalTypes}
      interval={interval}
      onChange={onChange}
    />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
