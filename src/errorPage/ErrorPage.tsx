import React, { SFC } from "react";
import { Link } from "react-router-dom";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Warning from "@material-ui/icons/Warning";

interface IProps extends WithStyles<typeof styles> {
  error: object;
}

const styles = createStyles({
  cardActions: {
    justifyContent: "flex-end"
  },
  cardContent: {
    textAlign: "center"
  },
  grid: {
    padding: 25
  },
  gridContainer: {
    height: "100%",
    overflow: "auto"
  },
  icon: {
    fill: "#B71C1C",
    height: 40,
    width: 40
  },
  title: {
    marginBottom: 12
  }
});

const homePageLink = () => <Link to="/" />;

const ErrorPage: SFC<IProps> = ({ classes, error }) => (
  <div className={classes.gridContainer}>
    <Grid container className={classes.grid}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Card>
              <CardContent className={classes.cardContent}>
                <Warning className={classes.icon} />
                <Typography variant="headline" component="h2">
                  OOOPS SOMETHING WENT WRONG
                </Typography>
              </CardContent>
              <CardContent>
                <Typography>{JSON.stringify(error)}</Typography>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Button variant="raised" component={homePageLink}>
                  Back to the Home Page
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(ErrorPage);
