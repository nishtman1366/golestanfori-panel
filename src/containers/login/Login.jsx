import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "redux/actions/actions";
import ItookApi from "api/ItookApi";
import axios from "axios";
import LoginUI from "./LoginUI";
import Snackbar from "@material-ui/core/Snackbar";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      username: "",
      password: "",
      isLoading: false,
      isSnackOpen: false,
      snackbarMessage: "",
      openModal: false,
      data: {
        meli: "",
        mobile: ""
      },
      busy: false,
      errors: {
        username: "",
        password: ""
      }
    };

    this.props.dispatch(actions.logout());
  }
  handleClickOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({
      openModal: false
    });
  };
  /**
   * @description : Callback for form text fields username data change
   *
   * @author Ali Aryani
   *
   * @param key (string)  : A string representing user's property e.g
   * @param data (string) : New value of form's text field for specified property
   *
   */

  handleUserNameChange = username => {
    this.setState({
      username,
      errors: { ...this.state.errors, username: "" }
    });
  };
  /**
   * @description : Callback for form text fields data change
   *
   * @author Ali Aryani
   *
   * @param key (string)  : A string representing user's property e.g : firstName, ...
   * @param data (string) : New value of form's text field for specified property
   *
   */
  handleFormDataChange = (key, data) => {
    console.log("ali", data);
    if (key === "meli" && data.length > 10) {
      return;
    }
    if (key === "mobile" && data.length > 11) {
      return;
    }
    this.setState({
      // errors: { ...this.state.errors, [key]: "" },

      data: {
        ...this.state.data,
        [key]: data
      }
    });
  };

  /**
   * @description : Callback for touching add button
   *
   * @author Ali Aryani
   *
   */
  handleSendRecovery = event => {
    event.preventDefault();

    // if (this.verifyUser()) {

    this.setState({ busy: true });

    ItookApi.sendRecovery(this.state.data).then(
      res => {
        if (res && res.status && res.status === 200) {
          var data = this.state.data;

          data.unshift({ ...this.state.user });
          this.setState({
            busy: false,

            snackbarMessage: "رمز جدید برای شما ارسال می گردد",
            isSnackOpen: true,
            type: "",
            data: {
              meli: "",
              mobile: ""
            },

            openModal: false
          });
        } else if (res && res.status && res.status === 422) {
          console.log("RESERROR", res.data.errors);

          var errors = {};

          for (var key in res.data.errors) {
            var error =
              typeof res.data.errors[key] === "string"
                ? res.data.errors[key]
                : res.data.errors[key][0];
            errors[key] = error;
          }

          this.setState({ busy: false, errors });
        } else if (res && res.status && res.status === 500) {
          this.setState({
            busy: false,
            isSnackOpen: true,
            snackbarMessage: "خطا در برقراری با سرور"
          });
        } else if (res && res.data) {
          console.log("RESERROR", res);

          this.setState({
            busy: false,
            isSnackOpen: true,
            snackbarMessage: res.data.message
          });
        }
      },
      err => {
        process.env.NODE_ENV === "development"
          ? console.log("handleAddData() failed with error :", err)
          : void 0;

        this.setState({
          busy: false,
          isSnackOpen: true,
          snackbarMessage: "خطا در انجام عملیات"
        });
      }
    );
    // }
  };
  /**
   * @description : Callback for form text fields password data change
   *
   * @author Ali Aryani
   *
   * @param key (string)  : A string representing user's property
   * @param data (string) : New value of form's text field for specified property
   *
   */
  handlePasswordChange = password => {
    this.setState({
      password,
      errors: { ...this.state.errors, password: "" }
    });
  };

  /**
   * @description : Attempts to start login process by calling proper action using given username and password.
   * It first checks if there are valid username and password by checkiing their length and then call @function login
   *
   * @author Ali Aryani
   *
   * @param username (string) : User's username
   * @param password (string) : User's password
   */
  handleLogin = (username, password) => {
    if (username.length === 0) {
      this.setState({
        snackbarMessage: "نام کاربری ضروری می باشد",
        isSnackOpen: true
      });
      return false;
    } else if (password.length === 0) {
      this.setState({
        snackbarMessage: "رمز کاربری ضروری می باشد",
        isSnackOpen: true
      });
      return false;
    }
    this.setState({ busy: true });

    ItookApi.login(username, password).then(
      res => {
        console.log("res", res);

        // console.log("token", res.data.user.accessToken);
        if (res && res.status && res.status === 200 && res.data) {
          var uData = res.data;
          axios.defaults.headers.common["Authorization"] = res.data.token;

          document.cookie = "token=" + res.data.token;

          this.props.dispatch(
            actions.updateUser({
              isLoggedIn: true
            })
          );

          // console.log("document.cookie", document.cookie);

          this.props.dispatch(
            actions.updateUser({ ...uData, isLoggedIn: true })
          );
          this.setState({
            busy: false

            // errors: this.DEFAULT_STATE.errors
          });
        } else if (res && res.status && res.status === 422) {
          console.log("RESERROR", res.data.errors);

          var errors = {};

          for (var key in res.data.errors) {
            var error =
              typeof res.data.errors[key] === "string"
                ? res.data.errors[key]
                : res.data.errors[key][0];
            errors[key] = error;
          }
          this.setState({
            busy: false,
            errors
          });

          // this.setState({ busy: false, errors });
        } else if (res && res.status && res.status === 400) {
          console.log("RESERROR", res.data);
          this.setState({
            snackbarMessage: res.data.message,
            isSnackOpen: true,
            busy: false
          });
        } else if (res && res.status && res.status === 500) {
          console.log("user", res);

          this.setState({
            busy: false,
            isSnackOpen: true,
            snackbarMessage: "خطا در برقراری با سرور"
          });
        } else {
          this.setState({
            busy: false,
            isSnackOpen: true,
            snackbarMessage: res.data.message
          });
        }
      },
      err => {
        process.env.NODE_ENV === "development"
          ? console.log("handleLogin() failed with error :", err)
          : void 0;

        this.setState({
          isSnackOpen: true,
          snackbarMessage: "خطا در برقراری ارتباط با سرور"
        });
      }
    );
  };

  /**
   * @description : Renders some helper components like snacks
   *
   * @author Ali Aryani
   *
   * @return React element
   */
  renderHelperComponents = () => {
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.isSnackOpen}
          message={this.state.snackbarMessage}
          style={{ textAlign: "center" }}
          ref="snackbar"
          autoHideDuration={3000}
          onClose={() => {
            this.setState({ isSnackOpen: false });
          }}
        />
      </div>
    );
  };

  /**
   * @description : Renders The main ui of login component based on states
   *
   * @author Ali Aryani
   *
   * @return React JSX elelemt
   */
  renderMainlUI = () => {
    return (
      <LoginUI
        onLogin={this.handleLogin}
        onUserNameChange={this.handleUserNameChange}
        onPasswordChange={this.handlePasswordChange}
        username={this.state.username}
        password={this.state.password}
        OnClickOpen={this.handleClickOpen}
        OpenModal={this.state.openModal}
        OnCloseModal={this.handleClose}
        data={this.state.data}
        onSendRecovery={this.handleSendRecovery}
        onFormDataChange={this.handleFormDataChange}
        busy={this.state.busy}
        errors={this.state.errors}
      />
    );
  };

  /**
   * @description : Renders the actual component
   *
   * @author Ali Aryani
   *
   * @return The main component
   */
  render() {
    return (
      <Fragment>
        <div>
          {this.renderMainlUI()}
          {this.renderHelperComponents()}
        </div>
      </Fragment>
    );
  }
}

export default connect()(Login);
