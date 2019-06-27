import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Remove } from "components/Icons";
import Loading from "containers/Loading";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { OPERATION_FAILED } from "components/StatesIcons";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
  },

  button: {
    margin: theme.spacing(1),
    color: "#fff",
    background: "linear-gradient(60deg, rgb(38, 198, 218), rgb(0, 172, 193))",
    fontFamily: "iransans",
    fontSize: ".9rem"
  },
  paper: {
    height: "100%",
    color: "fff",
    position: "relative",
    top: "-42px",
    padding: "8px"
  },
  input: {
    display: "none"
  },
  textFieldFormLabel: {
    textAlign: "right",
    right: "0",
    left: "auto",
    fontFamily: "iransans",
    fontSize: ".9rem",
    direction: "ltr"
  },
  textFieldForm: {
    fontFamily: "iransans",
    fontSize: ".9rem"
  },
  textFieldFormAdressLabel: {
    textAlign: "right",
    direction: "ltr",
    right: "0",
    left: "auto",
    fontFamily: "iransans",
    fontSize: ".9rem"
  },
  textField: {
    width: 200,
    fontFamily: "iransans",
    fontSize: ".9rem"
  }
});
class ProfileUI extends Component {
  render() {
    return <div style={{ marginTop: "32px" }}>{this.renderForm()}</div>;
  }

  renderForm = () => {
    const { classes } = this.props;
    // console.log(this.props.states.user);
    if (!this.props.states.user) {
      return (
        <div style={{ marginTop: "15%" }}>
          <Grid container justify="center" alignItems="center">
            {OPERATION_FAILED}
          </Grid>

          <p style={{ fontSize: ".8rem", color: "#999999", marginLeft: 32 }}>
            خطا در دریافت اطلاعات از سرور
          </p>
        </div>
      );
    } else {
      if (this.props.states.isLoading) {
        return (
          <div style={{ top: 32 }}>
            <Loading />
          </div>
        );
      } else {
        var buttonOrCircular;

        if (this.props.states.isUpdating) {
          buttonOrCircular = <CircularProgress size={30} />;
        } else {
          buttonOrCircular = (
            <Button
              className={classes.button}
              onTouchTap={event => {
                this.props.handlers.onUpdateUser();
              }}
            >
              ثبت تغییرات
            </Button>
          );
        }
        return (
          <div className={classes.root}>
            <Grid
              container
              className={classes.root}
              justify="center"
              alignItems="center"
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                style={{ marginTop: "64px" }}
                justify="center"
                alignItems="center"
              >
                <Paper className={classes.paper}>
                  <Grid item xs={12} justify="center" alignItems="center">
                    <Paper
                      className={classes.paper}
                      style={{
                        background: "#000"
                      }}
                    >
                      <input
                        ref="avatarUpload"
                        accept=".png,.jpg,.jpeg"
                        className={classes.input}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={event => {
                          this.props.handlers.onAvatarChange(event);
                          this.refs.avatarUpload.value = "";
                        }}
                      />
                      {this.props.states.user.avatarPath !== null ? (
                        <div>
                          <label htmlFor="raised-button-file">
                            <Avatar
                              // alt="Adelle Charles"
                              src={this.props.states.user.avatarPath}
                              style={{
                                position: "relative",
                                margin: "auto",
                                width: 48,
                                height: 48,
                                cursor: "pointer"
                              }}
                            />
                          </label>
                          {/* <IconButton
                            onTouchTap={this.props.handlers.onRemoveAvatar}
                          >
                            <Remove />
                          </IconButton> */}
                        </div>
                      ) : (
                        <label htmlFor="raised-button-file">
                          <Avatar
                            // alt="Adelle Charles"
                            // src={this.props.states.user.avatarPath}
                            style={{
                              position: "relative",
                              margin: "auto",
                              width: 48,
                              height: 48,
                              cursor: "pointer",
                              fontFamily: "iransans",
                              fontSize: ".9rem"
                            }}
                          >
                            {this.props.states.user &&
                            this.props.states.user.firstName
                              ? this.props.states.user.firstName.substring(0, 1)
                              : "ن"}
                          </Avatar>
                        </label>
                      )}
                    </Paper>
                  </Grid>
                  <div>
                    <form
                      className={classes.container}
                      noValidate
                      autoComplete="off"
                    >
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justify="center"
                      >
                        <Grid item xs={12} md={6}>
                          <TextField
                            disabled
                            id="firstName"
                            label="نام"
                            value={this.props.states.user.firstName}
                            // onChange={e => {
                            //   this.props.handlers.onEnterData(
                            //     "first_name",
                            //     e.target.value
                            //   );
                            // }}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                              className: classes.textFieldFormLabel
                            }}
                            InputProps={{
                              shrink: true,
                              className: classes.textFieldForm
                            }}
                            style={{
                              fontFamily: "iransans",
                              fontSize: ".9rem"
                            }}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            disabled
                            id="lastName"
                            label="نام خانوادگی"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                              className: classes.textFieldFormLabel
                            }}
                            InputProps={{
                              shrink: true,
                              className: classes.textFieldForm
                            }}
                            value={this.props.states.user.lastName}
                            // onChange={e => {
                            //   this.props.handlers.onEnterData(
                            //     "last_name",
                            //     e.target.value
                            //   );
                            // }}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            disabled
                            // error={this.props.states.errors.user_name.length > 0}
                            required
                            id="username"
                            label="نام کاربری"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                              className: classes.textFieldFormLabel
                            }}
                            InputProps={{
                              shrink: true,
                              className: classes.textFieldForm
                            }}
                            value={this.props.states.user.username}
                            // helperText={this.props.states.errors.username}
                            // onChange={e => {
                            //   this.props.handlers.onFormDataChange(
                            //     "username",
                            //     e.target.value
                            //   );
                            // }}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            error={this.props.states.errors.password.length > 0}
                            helperText={this.props.states.errors.password}
                            required
                            label="کلمه عبور جدید"
                            InputLabelProps={{
                              shrink: true,
                              className: classes.textFieldFormLabel
                            }}
                            InputProps={{
                              shrink: true,
                              className: classes.textFieldForm
                            }}
                            id="password"
                            type="password"
                            className={classes.textField}
                            value={this.props.states.user.password}
                            // helperText={this.props.states.errors.password}
                            onChange={e => {
                              this.props.handlers.onEnterData(
                                "password",
                                e.target.value
                              );
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            error={this.props.states.errors.mobile.length > 0}
                            helperText={this.props.states.errors.mobile}
                            required
                            id="mobile"
                            label="تلفن همراه"
                            InputLabelProps={{
                              shrink: true,
                              className: classes.textFieldFormLabel
                            }}
                            InputProps={{
                              shrink: true,
                              className: classes.textFieldForm
                            }}
                            type="number"
                            value={this.props.states.user.mobile}
                            onChange={e => {
                              this.props.handlers.onEnterData(
                                "mobile",
                                e.target.value
                              );
                            }}
                            className={classes.textField}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            error={this.props.states.errors.email.length > 0}
                            helperText={this.props.states.errors.email}
                            required
                            id="email"
                            InputLabelProps={{
                              shrink: true,
                              className: classes.textFieldFormLabel
                            }}
                            InputProps={{
                              shrink: true,
                              className: classes.textFieldForm
                            }}
                            label="پست الکترونیکی"
                            className={classes.textField}
                            value={this.props.states.user.email}
                            onChange={e => {
                              this.props.handlers.onEnterData(
                                "email",
                                e.target.value
                              );
                            }}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          {buttonOrCircular}
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        );
      }
    }
  }; // end of render form
} // end of class

ProfileUI.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ProfileUI);
