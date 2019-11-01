import React, { FC, useState, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState } from "rootReducer";

import { getAllowedValuesAsync } from "workbench/query/api";
import { IUdsFilterDescriptionDtc } from "workbench/query/types";
import {
  ErrorActions,
  IErrorResponse,
  handleException
} from "common/errorBoundary/actions";
import {
  updateQueryConstraintValues,
  IUpdateQueryConstraintValues
} from "workbench/query/constraints/actions";

import LoadingContainer from "common/loading/LoadingContainer";
import AllowedValues from "workbench/query/constraints/AllowedValues";
import { IOption } from "common/select/SelectInputContainer";

interface IOwnProps {
  elementId: number;
  constraintId: number;
  availableFilter: IUdsFilterDescriptionDtc;
  displayValue?: string[];
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

const AllowedValuesContainer: FC<Props> = ({
  session,
  availableFilter: {
    AllowedValuesSessionId,
    AllowedValuesQueryGraphId,
    FilterName
  },
  displayValue,
  dispatchHandleException
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allowedValueOptions, setAllowedValueOptions] = useState<IOption[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    if (session == null) {
      throw new Error("Session cannot be null.");
    }
    setIsLoading(true);

    getAllowedValuesAsync(
      session.TenantId,
      AllowedValuesSessionId,
      AllowedValuesQueryGraphId,
      FilterName
    )
      .then(allowedValues => {
        let selectedValues: string[];
        if (displayValue == null) {
          const allSelected = allowedValues.find(({ Selected }) => !Selected);
          selectedValues =
            allSelected == null
              ? allowedValues.map(({ ValueVector }) => ValueVector[0] as string)
              : allowedValues
                  .filter(({ Selected }) => Selected)
                  .map(({ ValueVector }) => ValueVector[0] as string);
        } else {
          selectedValues = displayValue;
        }

        setAllowedValueOptions(
          allowedValues.map<IOption>(({ DisplayValue, ValueVector }) => ({
            label: DisplayValue,
            value: ValueVector[0]
          }))
        );
        setSelectedValues(selectedValues);
        setIsLoading(false);
      })
      .catch(e => dispatchHandleException(e));
  }, []);

  const handledUpdateQueryConstraintValues = (selectedOptions?: IOption[]) => {
    // const {
    //   elementId,
    //   constraintId,
    //   dispatchUpdateQueryConstraintValues
    // } = this.props;
    // TODO: convert value to vector value.
    // dispatchUpdateQueryConstraintValues(
    //   elementId,
    //   constraintId,
    //   valuesObj.vectorValues
    // );
  };

  return (
    <LoadingContainer isLoading={isLoading}>
      <AllowedValues
        selectedValues={selectedValues}
        allowedValueOptions={allowedValueOptions}
        handledUpdateQueryConstraintValues={handledUpdateQueryConstraintValues}
      />
    </LoadingContainer>
  );
};

const mapStateToProps = ({ sessionGraph: { session } }: RootState) => ({
  session
});

const mapDispatchToProps = (
  dispatch: Dispatch<ErrorActions | IUpdateQueryConstraintValues>
) => ({
  dispatchHandleException: (resp: IErrorResponse) => {
    dispatch(handleException(resp));
  },
  dispatchUpdateQueryConstraintValues: (
    elementId: number,
    constraintId: number,
    constraintValues: any[]
  ) =>
    dispatch(
      updateQueryConstraintValues(elementId, constraintId, constraintValues)
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllowedValuesContainer);
