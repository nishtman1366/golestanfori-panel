/**
 * @description : This is the main ui for Login component
 *
 * @method renderLoginUI
 * @method render
 *
 * @author Ali Aryani
 * @since File available since Release 1.0.0
 * @version 1.0.0
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { UserName, Password } from "components/Icons";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";

import DialogTitle from "@material-ui/core/DialogTitle";
import { RecoveryPass } from "components/Icons";
import CircularProgress from "@material-ui/core/CircularProgress";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200
  },
  textFieldFormLabel: {
    textAlign: "right",
    right: "0",
    fontFamily: "iransans",
    fontSize: ".9rem",

    direction: "ltr",
    left: "auto"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  button: {
    margin: theme.spacing.unit,
    color: "#fff",
    background: "linear-gradient(60deg, rgb(38, 198, 218), rgb(0, 172, 193))"
  },
  paper: {
    height: "100%",
    color: "#fff",
    position: "relative",
    top: "-42px",
    padding: "8px"
  }
});

class LoginUI extends Component {
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        {/* <div>{this.renderAppBar()}</div> */}
        {this.renderRecoveryDialog()}

        <div style={{ marginTop: "100px" }}>{this.renderForm()}</div>
      </div>
    );
  }
  renderRecoveryDialog = () => {
    const { fullScreen } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.OpenModal}
        onClose={this.props.OnCloseModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="add" style={{ textAlign: "center" }}>
          <RecoveryPass />
        </DialogTitle>
        <DialogContent>{this.renderRecoveryDialogBody()}</DialogContent>
        <Grid container alignItems="center" justify="center">
          <DialogActions>
            {this.props.busy ? (
              <CircularProgress size={30} />
            ) : (
              <Button
                onClick={this.props.onSendRecovery}
                color="secondary"
                style={{
                  fontFamily: "iransans",
                  fontSize: ".9rem",
                  background: "#4caf50"
                }}
              >
                تایید
              </Button>
            )}

            <Button
              onClick={this.props.OnCloseModal}
              color="secondary"
              style={{
                fontFamily: "iransans",
                fontSize: ".9rem",
                background: "#f44336"
              }}
            >
              انصراف
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    );
  };

  renderRecoveryDialogBody = () => {
    const { classes } = this.props;

    return (
      <div>
        <Grid container>
          <form onSubmit={this.props.onSendRecovery}>
            <Grid container spacing={8} justify="center">
              <Grid item xs={12}>
                <TextField
                  type="number"
                  // error={this.props.errors.meli.length > 0}
                  // helperText={this.props.errors.meli}
                  required
                  id="required"
                  label="شماره ملی"
                  InputLabelProps={{
                    className: classes.textFieldFormLabel
                  }}
                  InputProps={{
                    className: classes.textFieldForm
                  }}
                  // value={this.props.user.meli}
                  onChange={e => {
                    this.props.onFormDataChange("meli", e.target.value);
                  }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // error={this.props.errors.mobile.length > 0}
                  // helperText={this.props.errors.mobile}
                  required
                  id="required"
                  label="تلفن همراه"
                  InputLabelProps={{
                    className: classes.textFieldFormLabel
                  }}
                  InputProps={{
                    className: classes.textFieldForm
                  }}
                  type="number"
                  // value={this.props.user.mobile}
                  onChange={e => {
                    this.props.onFormDataChange("mobile", e.target.value);
                  }}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <button type="submit" hidden />
          </form>
        </Grid>
      </div>
    );
  };
  renderAppBar = () => {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" background="#000">
          <Toolbar>
            <Typography
              variant="title"
              style={{
                color: "#fff",
                fontSize: 24,
                fontFamily: "iransans"
              }}
            >
              خرلاک
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  };

  renderForm = () => {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          container
          className={classes.root}
          justify="center"
          alignItems="stretch"
        >
          <Grid item xs={12} sm={8} md={3} style={{ marginTop: "64px" }}>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <Paper
                  className={classes.paper}
                  style={{
                    background: "#000"
                  }}
                >
                  <div style={{ textAlign: "center", padding: 16 }}>
                    {/* <Avatar className={classes.avatar}> */}

                    <div
                      style={{
                        borderRadius: "100%",
                        background: "#ce313a",
                        display: "inline-block",
                        padding: 8
                      }}
                    >
                      {" "}
                      <LockOutlinedIcon style={{ verticalAlign: "middle" }} />
                    </div>
                    {/* </Avatar> */}
                    <Typography
                      component="h1"
                      variant="h5"
                      style={{
                        marginTop: 8,
                        fontFamily: "iransans",
                        fontSize: "1.7rem"
                      }}
                    >
                      ورود
                    </Typography>
                  </div>
                </Paper>
              </Grid>

              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  marginTop: 16
                }}
              >
                <form
                  className={classes.margin}
                  onSubmit={e => {
                    e.preventDefault();
                    this.props.onLogin(
                      this.refs.loginUsername.input.value,
                      this.refs.password.input.value
                    );
                  }}
                >
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={1}
                      alignItems="center"
                      justify="center"
                    >
                      <Grid item style={{ marginTop: 12 }}>
                        <UserName />
                      </Grid>
                      <Grid item>
                        <TextField
                          required
                          // error={this.props.errors.username}
                          // helperText={this.props.errors.username}
                          autoFocus={true}
                          label="نام کاربری"
                          id="username"
                          type="text"
                          value={this.props.username}
                          onChange={e => {
                            this.props.onUserNameChange(e.target.value);
                          }}
                          inputRef={el => (this.loginUsername = el)}
                          InputLabelProps={{
                            shrink: true,
                            className: classes.textFieldFormLabel
                          }}
                        />
                      </Grid>
                    </Grid>
                  </div>

                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={1}
                      alignItems="center"
                      justify="center"
                    >
                      <Grid item style={{ marginTop: 12 }}>
                        <Password />
                      </Grid>
                      <Grid item>
                        <TextField
                          // error={this.props.errors.password}
                          // helperText={this.props.errors.password}
                          required
                          label="رمز عبور"
                          id="adornment-password"
                          type="password"
                          value={this.props.password}
                          onChange={e => {
                            this.props.onPasswordChange(e.target.value);
                          }}
                          inputRef={el => (this.password = el)}
                          InputLabelProps={{
                            shrink: true,
                            className: classes.textFieldFormLabel
                          }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div style={{ margin: "32px 0px" }}>
                    <Grid
                      container
                      spacing={8}
                      alignItems="center"
                      justify="center"
                    >
                      {this.props.busy ? (
                        <CircularProgress size={30} />
                      ) : (
                        <Grid item>
                          <Button
                            onClick={e => {
                              e.preventDefault();
                              console.log("refssss", this.loginUsername.value);

                              this.props.onLogin(
                                this.loginUsername.value,
                                this.password.value
                              );
                            }}
                            variant="raised"
                            color="secondary"
                            className={classes.button}
                            type="submit"
                            style={{
                              color: "#fff",
                              width: 200,
                              background:
                                "linear-gradient(60deg, rgb(38, 198, 218), rgb(0, 172, 193))"
                            }}
                          >
                            ورود
                          </Button>
                          <p style={{ color: "#939393", cursor: "pointer" }}>
                            فراموشی کلمه عبور
                          </p>
                        </Grid>
                      )}
                    </Grid>
                  </div>
                </form>
                {/* <Grid
                  container
                  spacing={8}
                  alignItems="center"
                  justify="flex-end"
                  style={{ paddingRight: "16px" }}
                >
                  <Button
                    onClick={this.props.OnClickOpen}
                    style={{
                      color: "rgb(0, 172, 193)",
                      fontSize: "1rem"
                    }}
                  >
                    فراموشی کلمه عبور
                  </Button>
                </Grid> */}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  };
}

LoginUI.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(LoginUI);
