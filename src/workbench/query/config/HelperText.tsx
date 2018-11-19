import React, { SFC } from "react";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

import InfoIcon from "@material-ui/icons/InfoOutlined";

import { helperText } from "workbench/query/config/steps";

interface IProps {
  currentStep: number;
}

const HelperText: SFC<IProps> = ({ currentStep }) => {
  const helper = helperText[currentStep];
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
