import React, { Component, Fragment } from "react";
import AppLayout from "components/appLayout/AppLayout";
import ItookApi from "api/ItookApi";

import HomeUI from "./HomeUI";

class Home extends Component {
  constructor(props) {
    super(props);
    this.DEFAULT_STATE = {
      page: 0,
      rowsPerPage: 5,
      messages: undefined, // To hold all messages
      users: undefined,
      isLoading: true,
      ordersChart: undefined
    };
    this.state = this.DEFAULT_STATE;
  }

  componentDidMount() {
    // this.load();
  }
  /**
   * @description : load inbox messages from the server
   *
   * @author Ali Aryani
   */
  load = () => {
    console.log("REdddS");
    this.setState(this.DEFAULT_STATE);

    // this.fetchInboxMessages();
    // this.fetchUsers();
    // this.fetchOrdersChart();
  };
  /**
   * @description : fetch orders data from the server
   *
   * @author Ali Aryani
   */
  fetchOrdersChart() {
    ItookApi.fetchOrdersChart().then(
      res => {
        if (res && res.status && res.status === 200 && res.data.ordersChart) {
          console.log("res", res);

          this.setState({
            ordersChart: res.data.ordersChart,
            isLoading: false
          });
          console.log("ordersChart", this.state.ordersChart);
        } else {
          this.setState({
            isLoading: false
          });
        }
      },
      err => {
        this.setState({ isLoading: false });
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
        this.setState({
          // driverData: [],
          isLoading: false
        });
      }
    );
  }

  /**
   * @description : fetch inbox messages data from the server
   *
   * @author Ali Aryani
   */
  fetchInboxMessages = () => {
    ItookApi.fetchInboxMessages().then(
      res => {
        console.log("RES", res);
        var state = null;

        if (res && res.status && res.status === 200 && res.data.messages) {
          var lastFiveMessages = [];
          if (res.data.messages.length > 5) {
            console.log("Message: ");
            for (
              var i = res.data.messages.length - 5;
              i < res.data.messages.length;
              i++
            ) {
              lastFiveMessages.push(res.data.messages[i]);
              // console.log("Message: ", res.data.messages[i]);
            }
          } else {
            lastFiveMessages = res.data.messages;
          }
          state = { messages: lastFiveMessages, isLoading: false };

          console.log("movafagh", res.data.messages);
        } else {
          console.log("RES", res);

          state = { messages: undefined, isLoading: false };
        }
        this.setState({ ...this.state, ...state }, () =>
          console.log(this.state)
        );
      },
      err => {
        this.setState({ isLoading: false });
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
      }
    );
  };

  /**
   * @description : fetch users data from the server
   *
   * @author Ali Aryani
   */
  fetchUsers = () => {
    ItookApi.fetchUsers().then(
      res => {
        console.log("res", res);

        if (res && res.status && res.status === 200 && res.data.users) {
          this.setState(
            {
              users: [...res.data.users],

              isLoading: false
            }
            // () => console.log("DATA", this.state.data)
          );
        } else {
          // console("RES", res);
          this.setState({ users: undefined, isLoading: false });
        }
      },
      err => {
        this.setState({ isLoading: false });
      }
    );
  };

  render() {
    return (
      <Fragment>
        <AppLayout title="خانه">
          {/* <HomeUI
            messages={this.state.messages}
            users={this.state.users}
            ordersChart={this.state.ordersChart}
          /> */}
        </AppLayout>
      </Fragment>
    );
  }
}

export default Home;
