import React, { FC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IUpdateQueryLabel, updateQueryLabel } from "workbench/query/actions";

import LabelInput from "workbench/query/label/LabelInput";

interface IOwnProps {
  elementId: number;
  initLabel: string;
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

const LabelInputContainer: FC<Props> = ({
  initLabel,
  elementId,
  dispatcLabelUpdate
}) => {
  const handleChangeLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatcLabelUpdate(elementId, event.target.value);
  };

  return (
    <LabelInput initLabel={initLabel} handleChangeLabel={handleChangeLabel} />
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IUpdateQueryLabel>) => ({
  dispatcLabelUpdate: (elementId: number, label: string) => {
    dispatch(updateQueryLabel(elementId, label));
  }
});

export default connect(undefined, mapDispatchToProps)(LabelInputContainer);
