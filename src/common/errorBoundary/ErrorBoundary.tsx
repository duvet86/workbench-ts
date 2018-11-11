import trimbleLogo from "topbar/trimbleLogo.png";

import React, { SFC } from "react";
import { Link, LinkProps } from "react-router-dom";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { WarningIcon, ContactUsIcon, HomeIcon } from "common/icons";

interface IProps extends WithStyles<typeof styles> {
  error: Error;
}

const styles = createStyles({
  grid: {
    padding: 25,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.08)"
  },
  card: {
    overflow: "auto",
    paddingBottom: 12
  },
  cardTitle: {
    display: "flex",
    alignItems: "center"
  },
  titleBody: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  cardActions: {
    justifyContent: "flex-end"
  },
  warningIcon: {
    fill: "#B71C1C",
    height: 40,
    width: 40
  },
  buttonIcon: {
    marginRight: 10
  },
  details: {
    whiteSpace: "pre-wrap"
  },
  summary: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    padding: 10
  },
  detailsBody: {
    padding: 15
  }
});

const homePageLink = (props: ButtonProps) => (
  <Link to="/" {...props as LinkProps} />
);

const ErrorBoundary: SFC<IProps> = ({ classes, error }) => (
  <Grid container className={classes.grid} justify="center">
    <Grid item xs={12}>
      <Card className={classes.card}>
        <CardContent className={classes.cardTitle}>
          <img src={trimbleLogo} alt="trimbleLogo" />
          <div className={classes.titleBody}>
            <WarningIcon className={classes.warningIcon} />
            <Typography variant="h5" component="h2">
              OOPS SOMETHING WENT WRONG
            </Typography>
          </div>
        </CardContent>
        <CardContent>
          <details className={classes.details}>
            <summary className={classes.summary}>
              <Typography>Error Details</Typography>
            </summary>
            <div className={classes.detailsBody}>
              <Typography>{error.toString()}</Typography>
            </div>
          </details>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button variant="contained">
            <ContactUsIcon className={classes.buttonIcon} />
            Report the issue
          </Button>
          <Button
            color="secondary"
            variant="contained"
            component={homePageLink}
          >
            <HomeIcon className={classes.buttonIcon} />
            Back to the Home Page
          </Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
);

export default withStyles(styles)(ErrorBoundary);