import React from "react";
import {
  create,
  act,
  ReactTestRenderer,
  ReactTestInstance
} from "react-test-renderer";

import LoadingContainer from "common/loading/LoadingContainer";
import BaseLoading from "common/loading/BaseLoading";

// Mock setTimeout.
jest.useFakeTimers();

describe("<LoadingContainer />", () => {
  it("Component with error shows error message.", () => {
    const error = {
      error: "ERROR"
    };

    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(
        <LoadingContainer isLoading={true} error={error}>
          <div>Child</div>
        </LoadingContainer>
      );
    });

    const instance = component!.root;

    const childComponent = instance.find(el => {
      return el.children && el.children[0] === JSON.stringify(error);
    });

    expect(childComponent).toBeDefined();
  });

  it("Component not loading shows children.", () => {
    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(
        <LoadingContainer isLoading={false}>
          <div>Child</div>
        </LoadingContainer>
      );
    });

    const instance = component!.root;

    expect(instance.children.length).toEqual(1);

    const childComponent = instance.find(
      el => el.children && el.children[0] === "Child"
    );

    expect(childComponent).toBeDefined();
  });

  it("Component re-loading and outside delay shows loading.", () => {
    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(
        <LoadingContainer isLoading={false}>
          <div>Child</div>
        </LoadingContainer>
      );
    });

    const instance = component!.root;

    expect(instance.children.length).toEqual(1);

    const childComponent = instance.find(el => {
      return el.children && el.children[0] === "Child";
    });

    expect(childComponent).toBeDefined();

    act(() => {
      component!.update(
        <LoadingContainer isLoading={true}>
          <div>Child</div>
        </LoadingContainer>
      );
    });

    // Component is still laoding but the delay hasn't passed. Return null.
    const child = instance.children[0] as ReactTestInstance;
    const childProps = child.props;

    expect(childProps.isLoading).toBeTruthy();
    expect(childProps.pastDelay).toBeFalsy();

    expect(child.children.length).toBe(0);

    jest.runAllTimers();

    // Delay has passed bu still loading. Show spinner.
    const loadingComponent = instance.findByType(BaseLoading);
    expect(loadingComponent).toBeDefined();
  });

  it("Component loading within delay return null.", () => {
    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(
        <LoadingContainer isLoading={true}>
          <div>Child</div>
        </LoadingContainer>
      );
    });

    const instance = component!.root;

    const child = instance.children[0] as ReactTestInstance;
    const childProps = child.props;

    expect(childProps.isLoading).toBeTruthy();
    expect(childProps.pastDelay).toBeFalsy();

    expect(child.children.length).toBe(0);
  });

  it("Component loading outside delay shows spinner.", () => {
    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(
        <LoadingContainer isLoading={true}>
          <div>Child</div>
        </LoadingContainer>
      );
    });

    // Fast-forward until all timers have been executed.
    jest.runAllTimers();

    const instance = component!.root;

    const childComponent = instance.findByType(BaseLoading);
    expect(childComponent).toBeDefined();
  });

  it("Component unmounted clears timeout.", () => {
    let component: ReactTestRenderer | undefined;
    act(() => {
      component = create(
        <LoadingContainer isLoading={true}>
          <div>Child</div>
        </LoadingContainer>
      );
    });

    component!.unmount();

    const clearTimeoutSpy = jest.spyOn(window, "clearTimeout");
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
  });
});
