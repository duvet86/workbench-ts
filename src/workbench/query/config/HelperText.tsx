import React, { SFC } from "react";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

import InfoIcon from "@material-ui/icons/InfoOutlined";

interface IProps {
  currentStep: number;
}

const HelperText: SFC<IProps> = ({ currentStep }) => {
  let title = "";
  let text = "";

  switch (currentStep) {
    case 0:
      title = "Query source";
      text = `Select from the drop down the source of your query.
        It can be a data source or an existing query.
        Once you are done go to the next step clicking on the next button.`;
      break;
    case 1:
      title = "Query columns";
      text = `Each source presents a list of available columns.
        You can search for a particular column using the search input.
        Click on a column on the available list to move it to the selected list.
        To remove a column from the selected list click on it again.`;
      break;
    case 2:
      title = "(Optional) Query Constraints";
      text = `Narrow down your data with constraints.
        Constraints are part of the query you are creating and are not visible outside of it.`;
      break;
    default:
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
          title={title}
          subheader={text}
        />
      </Card>
    </Grid>
  );
};

export default HelperText;
