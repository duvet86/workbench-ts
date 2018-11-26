import React, { SFC } from "react";

import { IHelperText } from "workbench/configElements/types";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

import InfoIcon from "@material-ui/icons/InfoOutlined";

interface IProps {
  currentStep: number;
  stepsHelpText: Array<IHelperText | undefined>;
}

const HelperText: SFC<IProps> = ({ stepsHelpText, currentStep }) => {
  const helper = stepsHelpText[currentStep];
  if (helper == null) {
    return null;
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          avatar={
            <Avatar>
              <InfoIcon />
            </Avatar>
          }
          title={helper.title}
          subheader={helper.text}
        />
      </Card>
    </Grid>
  );
};

export default HelperText;
