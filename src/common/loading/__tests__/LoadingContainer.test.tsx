import React from "react";
import { create } from "react-test-renderer";

import LoadingContainer from "common/loading/LoadingContainer";

test("Test LoadingContainer", () => {
  const component = create(
    <LoadingContainer isLoading={false}>
      <div>Child</div>
    </LoadingContainer>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
