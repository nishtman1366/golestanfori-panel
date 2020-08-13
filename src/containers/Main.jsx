/**
 * @description This component is parent of the whole application's components except
 * components related to login. Some proccess like access right check or
 * login by cookie happens here.
 *
 * @method constructor
 * @method componentDidMount
 * @method componentWillReceiveProps
 * @method componentWillMount
 * @method render
 * @method canUserOpenRequestedRoute
 * @method checkForRememberCookie
 * @method checkRouteAccess
 *
 * @author Ali Aryani
 * @since File available since Release 1.0.0 (2018)
 * @version 1.0.0
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import Loading from "containers/Loading";

import ItookApi from "api/ItookApi";
import axios from "axios";
import * as actions from "redux/actions/actions";

// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
// import { browserHistory } from "react-router";
// import AppLayout from "components/appLayout/AppLayout";
// import { updateUser } from "redux/actions/actions";
// import Loading from "./Loading";

class Main extends Component {
  constructor(props) {
    super(props);
    // Component default states
    this.DEFAULT_STATES = {
      isUserLoggedIn: false, // To track if user is logged in or not,
      busy: true
    };

    this.state = this.DEFAULT_STATES;
    this.data = this.DEFAULT_DATA;
  }

  componentWillMount() {
    const cookie = this.getCookie("token");
    // console.log("todasdasdasdken", this.props.user);
    // console.log("cookie", cookie);

    if (cookie === "") {
      // console.log("cookie", cookie);

      browserHistory.replace("/login");
    } else if (this.props.user.isLoggedIn) {
      // console.log("todasdasdasdken", this.props.user);

      this.setState({ isUserLoggedIn: true });
    } else {
      // console.log("loginByCookie");

      this.loginByCookie(cookie);
    }
  }

  // componentDidMount() {
  //   this.load();
  // }

  // /**
  //  * @description : load drivers from the server
  //  *
  //  * @author Ali Aryani
  //  */
  // load = () => {
  //   this.setState(this.DEFAULT_STATE);

  //   ItookApi.fetchUserDataAccessess().then(
  //     res => {
  //       this.setState({ isLoading: false });

  //       console.log("res", res);

  //       if (res && res.status && res.status === 200 && res.data.user) {
  //         this.props.dispatch(
  //           actions.updateUser({
  //             user: res.data.user
  //           })
  //         );
  //       } else {
  //         this.setState({ user: undefined, isLoading: false });
  //       }
  //     },
  //     err => {
  //       this.setState({ isLoading: false });
  //     }
  //   );
  // };
  // componentDidMount() {
  //   window.Pusher = require("pusher-js");

  //   // First check store to see if user is logged in
  //   // if (
  //   //   this.props.user &&
  //   //   this.props.user.isLoggedIn &&
  //   //   this.state.isUserLoggedIn !== true
  //   // ) {
  //   //   this.setState({ isUserLoggedIn: true });
  //   // }
  // }

  render() {
    if (this.state.isUserLoggedIn) {
      return (
        <div>
          <div>{this.props.children}</div>
        </div>
      );
    } else if (this.state.busy) {
      return <Loading />;
    }
  }
  getCookie(cname) {
    // console.log("cname", cname);

    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  loginByCookie(token) {
    ItookApi.loginByCookie(token).then(res => {
      if (res && res.status && res.status === 200 && res.data) {
        // console.log("reserror", res);

        axios.defaults.headers.common["Authorization"] = res.data.token;
        this.props.dispatch(
          actions.updateUser({ ...res.data, isLoggedIn: true })
        );
        this.setState({ busy: false, isUserLoggedIn: true });
        // this.componentWillMount();
      } else if (res && res.status === 401) {
        console.log("reserror", res);
        browserHistory.replace("/login");
      } else {
        console.log("error");
      }
    });
  }
} // End of the class

export default connect(state => {
  return {
    app: state.app,
    user: state.user
  };
})(Main);
