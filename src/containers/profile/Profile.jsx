import React, { Component, Fragment } from "react";
import AppLayout from "components/appLayout/AppLayout";
import ItookApi from "api/ItookApi";
import { connect } from "react-redux";
import { isNumber, validateMobile, validateEmail } from "helpers/Helpers";
import Snackbar from "@material-ui/core/Snackbar";

import ProfileUI from "./ProfileUI";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.MOBILE_LENGTH = 11;
    this.TELLPHONE_LENGTH = 11;
    this.PASSWORD_MIN_LENGTH = 6;

    this.DEFAULT_STATES = {
      snack: {
        open: false,
        snackbarMessage: ""
      },
      user: undefined,
      isLoading: true,
      isUpdating: false,
      errors: {
        mobile: "",
        email: "",
        password: "",
        tell: ""
      },

      avatarPath: null
      // isLoading: true,
      // isSnackOpen: false,
      // snackMessage: "",
      // isUpdating: false,
      // saveButtonClassName: "",
      // isPasswordDialogOpen: false,
      // passwordRef: ""
    };

    this.handlers = {
      onRemoveAvatar: this.handleRemoveAvatar,
      onEnterData: this.handleEnterData,
      onAvatarChange: this.handleAvatarChange,
      // onCloseSnackbar: this.handleCloseSnackbar,
      onUpdateUser: this.handleUpdateUser
      // onPasswordDialogconfirm: this.handlePasswordDialogconfirm,
      // onPasswordDialogClose: this.handlePasswordDialogClose
    };

    this.state = this.DEFAULT_STATES;
  }

  componentDidMount() {
    this.load();
  }
  load = () => {
    this.setState(this.DEFAULT_STATES);
    this.fetchUserProfile();
  };

  /**
   * @description : Handler for text fields data change
   *
   * @author Ali Aryani
   *
   * @param key( string):object key of state.user object
   *
   *.@param data (string):input data of textfields
   *
   * @return
   */
  handleEnterData = (key, data) => {
    console.log("ali", data);

    this.setState(
      {
        user: { ...this.state.user, [key]: data },
        errors: { ...this.state.errors, [key]: "" }
      },
      () => {
        console.log("user", this.state.user);
      }
    );
  };
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
   * @description : get user information from server
   *
   * @author Ali Aryani
   */
  fetchUserProfile = () => {
    ItookApi.fetchUserProfile().then(
      res => {
        console.log("res", res);
        // console.log("tokeeen", res.data.token);

        if (res && res.status && res.status === 200) {
          // axios.defaults.headers.common["accessToken"] = res.data.token;
          // console.log("tokeeen", res.data.token);

          this.setState({
            user: res.data,
            isLoading: false
          });
        } else if (res && res.status && res.status === 500) {
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
        this.setState({ isLoading: false });
      }
    );
  };

  handleAvatarChange = e => {
    // if (e.target.files[0]) {
    //   if (
    //     process.env.REACT_APP_MAX_JAVAZ_UPLOAD_SIZE_IN_BYTE >
    //     e.target.files[0].size
    //   ) {
    //     if (
    //       ["jpg", "jpeg", "png"].indexOf(
    //         e.target.files[0].name.split(".").pop()
    //       ) !== -1
    //     ) {
    this.setState(
      {
        avatarPath: e.target.files[0],
        user: {
          ...this.state.user,
          avatarPath: URL.createObjectURL(e.target.files[0])
        }
      },
      () => console.log(this.state.user)
    );
    //     } else {
    //       this.setState({
    //         isSnackOpen: true,
    //         snackbarMessage: "نوع فایل انتخابی معتبر نمی‌باشد",
    //         avatarPath: null,
    //         user: {
    //           ...this.state.user,
    //           avatarPath: ""
    //         }
    //       });
    //     }
    //   } else {
    //     this.setState({
    //       isSnackOpen: true,
    //       snackbarMessage: "حجم فایل انتخابی بیشتر از x مگابایت می‌باشد".replace(
    //         "x",
    //         process.env.REACT_APP_MAX_JAVAZ_UPLOAD_SIZE_IN_KBYTE.toString()
    //       ),
    //       user: {
    //         ...this.state.user,
    //         avatarPath: ""
    //       }
    //     });
    //   }
    // }

    // this.setState({
    //   avatarPath: e.target.files[0],

    //   user: {
    //     ...this.state.user,
    //     avatarPath: e.target.files[0]
    //   }
    // });
  };

  /**
   * @description : Verifies user's data
   *
   * @author Ali Aryani
   *
   * @return true|false
   */
  verifyUser = () => {
    var errors = {};

    // // Checking password
    // if (this.state.user.password === "") {
    //   errors.password = "رمز عبور را وارد کنید";
    // } else if (this.state.user.password.startsWith(" ")) {
    //   errors.password = "فرمت  رمز عبور معتبر نیست";
    // } else if (this.state.user.password.length < this.PASSWORD_MIN_LENGTH) {
    //   errors.password = "رمز عبور نباید کمتر از 6 کاراکتر باشد";
    // } else if (this.state.user.password.length > this.PASSWORD_MAX_LENGTH) {
    //   errors.password = "رمز عبور نباید بیشتر از 32 کاراکتر باشد";
    // }
    // Checking mobile
    if (this.state.user.mobile === "") {
      errors.mobile = "موبایل را وارد کنید";
    } else if (!validateMobile(this.state.user.mobile)) {
      errors.mobile = "تلفن همراه وارد شده اشتباه است";
    }

    // Checking email
    console.warn("EMAIL", this.state.user.email);

    if (
      this.state.user.email != null &&
      this.state.user.email.length !== 0 &&
      !validateEmail(this.state.user.email)
    ) {
      errors.email = "ایمیل وارد شده اشتباه است";
    }

    // Checking office_phone
    if (this.state.user.tell === "") {
      errors.tell = "  تلفن را وارد کنید";
    } else if (!isNumber(this.state.user.tell)) {
      errors.tell = "تلفن عدد می باشد";
    } else if (this.state.user.tell.length !== this.TELLPHONE_LENGTH) {
      errors.tell = " تلفن 11 رقمی می باشد";
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors: { ...this.state.errors, ...errors } });
      return false;
    }
    return true;
  };

  /**
   * @description : Start api call to update user's profile
   *
   * @author Ali Aryani
   *
   */
  handleUpdateUser = event => {
    console.log("handle", event);
    if (this.verifyUser()) {
      this.setState({ isUpdating: true });

      ItookApi.updateUserProfile(this.createFormData()).then(
        res => {
          if (res && res.status && res.status === 200) {
            this.setState({
              // errors: this.DEFAULT_STATE.errors,
              isUpdating: false,

              snackbarMessage: "عملیات با موفقیت انجام شد",
              isSnackOpen: true
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
          } else {
            this.setState({
              busy: false,
              isSnackOpen: true,
              snackbarMessage: res.data.message
            });
          }
        },
        err => {
          this.setState({
            isUpdating: false,

            isSnackOpen: true,
            snackbarMessage: "خطا در انجام عملیات"
          });
        }
      );
    }
  };

  /**
   * @description : Callback for touching remove button
   *
   * @author Ali Aryani
   *
   */
  handleRemoveAvatar = () => {
    this.setState({
      avatarPath: "",
      user: {
        ...this.state.user,
        avatarPath: ""
      }
    });
  };

  /**
   * @description : Creates a form data
   *
   * @author Ali Aryani
   *
   * @return FormData object
   */
  createFormData = key => {
    console.log("createFormData");
    let formData = new FormData();

    formData.append("mobile", this.state.user.mobile);
    // formData.append("tell2", this.state.user.tell);
    formData.append(
      "email",
      this.state.user.email ? this.state.user.email : ""
    );
    formData.append("tell", this.state.user.tell);
    formData.append("password", this.state.user.password);

    formData.append("avatarPath", this.state.avatarPath);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    return formData;
  };
  renderMainlUI = () => {
    return <ProfileUI states={this.state} handlers={this.handlers} />;
  };
  render() {
    return (
      <Fragment>
        <AppLayout title="پروفایل">
          <div>
            {this.renderMainlUI()}
            {this.renderHelperComponents()}
          </div>
        </AppLayout>
      </Fragment>
    );
  }
}

export default connect()(Profile);
