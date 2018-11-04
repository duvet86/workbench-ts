import logo from "login/logo.svg";

import React, { ChangeEvent, Component, FormEvent, MouseEvent } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

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

interface IProps extends WithStyles<typeof styles> {
  isInvalidCredentials: boolean;
  submitHandler: (username: string, password: string) => void;
}

interface IState {
  username: string;
  password: string;
  showPassword: boolean;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
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
      padding: unit * 3
    },
    form: {
      marginTop: unit * 3
    },
    passwordControl: {
      marginRight: unit,
      marginBottom: unit * 3
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
  });

class Login extends Component<IProps, IState> {
  public readonly state = {
    username: "",
    password: "",
    showPassword: false
  };

  public render() {
    const { classes, isInvalidCredentials } = this.props;

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
              <img src={logo} className={classes.appLogo} alt="logo" />
            </div>
            <Typography component="p" align="center">
              Reactive
            </Typography>
            <Typography variant="h5" component="h3" align="center">
              Connected Mine Analitycs
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.submitHandler}
            >
              <FormControl fullWidth>
                <InputLabel htmlFor="username">User Name</InputLabel>
                <Input
                  id="username"
                  onChange={this.handleChange("username")}
                  autoComplete="username"
                />
              </FormControl>
              <FormControl className={classes.passwordControl} fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={this.state.showPassword ? "text" : "password"}
                  onChange={this.handleChange("password")}
                  autoComplete="current-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={this.handleClickShowPasssword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
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
  }

  private handleChange = (prop: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    // TODO: fix me: typescript issue.
    this.setState({ [prop]: event.target.value } as any);
  };

  private handleMouseDownPassword = (e: MouseEvent) => {
    e.preventDefault();
  };

  private handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  private submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.submitHandler(username, password);
  };
}

export default withStyles(styles)(Login);
