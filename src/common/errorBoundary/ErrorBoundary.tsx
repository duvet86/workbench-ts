import React, { SFC, ErrorInfo } from "react";
import { Link } from "react-router-dom";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Warning from "@material-ui/icons/Warning";

interface IProps extends WithStyles<typeof styles> {
  error: Error;
  errorInfo?: ErrorInfo;
}

const styles = createStyles({
  cardActions: {
    justifyContent: "flex-end"
  },
  cardContent: {
    textAlign: "center"
  },
  icon: {
    fill: "#B71C1C",
    height: 40,
    width: 40
  },
  details: {
    whiteSpace: "pre-wrap"
  }
});

const homePageLink = () => <Link to="/" />;

const ErrorBoundary: SFC<IProps> = ({ classes, error, errorInfo }) => (
  <Card>
    <CardContent className={classes.cardContent}>
      <Warning className={classes.icon} />
      <Typography variant="h5" component="h2">
        OOPS SOMETHING WENT WRONG
      </Typography>
      {errorInfo && (
        <details className={classes.details}>
          {errorInfo.componentStack}
        </details>
      )}
    </CardContent>
    <CardContent>
      <Typography>{error.toString()}</Typography>
    </CardContent>
    <CardActions className={classes.cardActions}>
      <Button variant="contained" component={homePageLink}>
        Back to the Home Page
      </Button>
    </CardActions>
  </Card>
);

export default withStyles(styles)(ErrorBoundary);
