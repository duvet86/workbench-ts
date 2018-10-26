import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "rootReducer";

import { getAllowedValueOptions } from "workbench/query/constraintSelector/selector";

import { LoadingContainer } from "common/loading";
import AllowedValuesSelect from "workbench/query/constraintSelector/AllowedValuesSelect";

interface IOwnProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type Props = ReturnType<typeof mapStateToProps> & IOwnProps;

class ConstraintSelectorContainer extends Component<Props> {
  public render() {
    const { isLoading, allowedValueOptions, onChange } = this.props;

    return (
      <LoadingContainer isLoading={isLoading}>
        <AllowedValuesSelect
          allowedValueOptions={allowedValueOptions}
          onChange={onChange}
        />
      </LoadingContainer>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isLoading: state.allowedValuesReducer.isLoading,
  allowedValueOptions: getAllowedValueOptions(state)
});

export default connect(mapStateToProps)(ConstraintSelectorContainer);
