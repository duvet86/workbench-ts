import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import HelpPageCard from "welcomePage/HelpPageCard";

import linksList from "common/linksList";
import SelectInputContainer from "common/select/SelectInputContainer";

const styles = createStyles({
  container: {
    padding: 25
  }
});

const options = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "American Samoa" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Anguilla" },
  { label: "Antarctica" },
  { label: "Antigua and Barbuda" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Aruba" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bermuda" },
  { label: "Bhutan" },
  { label: "Bolivia, Plurinational State of" },
  { label: "Bonaire, Sint Eustatius and Saba" },
  { label: "Bosnia and Herzegovina" },
  { label: "Botswana" },
  { label: "Bouvet Island" },
  { label: "Brazil" },
  { label: "British Indian Ocean Territory" },
  { label: "Brunei Darussalam" }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}));

const asd = (option: any) => {
  // tslint:disable-next-line:no-console
  console.log(option);
};

const WelcomePage: SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <Grid container className={classes.container} spacing={16}>
    <SelectInputContainer
      initValue={[]}
      isMulti
      options={options}
      onChange={asd}
    />
    <Grid item xs={12}>
      <Typography variant="h5" gutterBottom>
        Welcome
      </Typography>
    </Grid>
    {linksList.map(({ id, ...rest }) => (
      <Grid item md={4} xs={12} key={id}>
        <HelpPageCard {...rest} />
      </Grid>
    ))}
  </Grid>
);

export default withStyles(styles)(WelcomePage);
