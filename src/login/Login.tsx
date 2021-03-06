import Logo from "login/logo.svg";

import React, { ChangeEvent, FormEvent, MouseEvent, FC } from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface IProps {
  showPassword: boolean;
  isInvalidCredentials: boolean;
  submitHandler: (e: FormEvent) => void;
  handleChange: (
    prop: string
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  handleMouseDownPassword: (e: MouseEvent) => void;
  handleClickShowPasssword: () => void;
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  "@keyframes appLogoSpin": {
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(360deg)"
    }
  },
  container: {
    height: "70%"
  },
  paper: {
    padding: spacing() * 3
  },
  form: {
    marginTop: spacing() * 3
  },
  passwordControl: {
    marginRight: spacing(),
    marginBottom: spacing() * 3
  },
  logoContainer: {
    textAlign: "center"
  },
  appLogo: {
    animation: "appLogoSpin infinite 20s linear",
    height: "50px"
  },
  errorMessage: {
    marginTop: 10,
    color: "red"
  }
}));

const Login: FC<IProps> = ({
  showPassword,
  submitHandler,
  handleChange,
  handleClickShowPasssword,
  handleMouseDownPassword,
  isInvalidCredentials
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.container}
      spacing={0}
    >
      <Grid item md={3} xs={11}>
        <Paper className={classes.paper}>
          <div className={classes.logoContainer}>
            <Logo className={classes.appLogo} alt="logo" />
          </div>
          <Typography component="p" align="center">
            Reactive
          </Typography>
          <Typography variant="h5" component="h3" align="center">
            Connected Mine Analitycs
          </Typography>
          <form className={classes.form} noValidate onSubmit={submitHandler}>
            <FormControl fullWidth>
              <InputLabel htmlFor="username">User Name</InputLabel>
              <Input
                id="username"
                onChange={handleChange("username")}
                autoComplete="username"
              />
            </FormControl>
            <FormControl className={classes.passwordControl} fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange("password")}
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPasssword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Login
            </Button>
          </form>
          {isInvalidCredentials && (
            <Typography className={classes.errorMessage} variant="subtitle1">
              Invalid Username or Password
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
