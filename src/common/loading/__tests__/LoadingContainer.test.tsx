import React from "react";
import { create } from "react-test-renderer";

import LoadingContainer from "common/loading/LoadingContainer";

test("Test LoadingContainer", () => {
  const component = create(
    <LoadingContainer isLoading={false}>
      <div>Child</div>
    </LoadingContainer>
  );

  const instance = component.root;

  expect(instance.children.length).toEqual(1);

  const childComponent = instance.find(el => {
    return el.children && el.children[0] === "Child";
  });
  expect(childComponent).toBeDefined();
});
