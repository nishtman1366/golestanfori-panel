/**
 * @description : Poll Component is main component for rendering PollUI related.
 *
 * @method load
 * @method handleOpen
 * @method handleClose
 * @method handleTitleChange
 * @method handleAddPoll
 * @method handleMeliChange
 * @method createFormData
 * @method handleClick
 * @method render
 * @method componentWillMount
 * @method componentDidMount
 *
 * @author Ali Aryani
 * @since File available since Release 1.0.0
 * @version 1.0.0
 *
 */

import React, { Component, Fragment } from "react";
import AppLayout from "components/appLayout/AppLayout";
import ItookApi from "api/ItookApi";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "components/Icons";
import Loading from "containers/Loading";
import Snackbar from "@material-ui/core/Snackbar";
import { OPERATION_FAILED } from "components/StatesIcons";
import Grid from "@material-ui/core/Grid";
import { browserHistory } from "react-router";

import PollUI from "./PollUI";

class Poll extends Component {
  constructor(props) {
    super(props);

    this.DEFAULT_STATE = {
      snack: {
        open: false,
        snackbarMessage: ""
      },
      openModal: false,
      OpenDeleteModal: false,
      OpenEditModal: false,
      isLoading: true,

      data: undefined,
      selected: [],
      busy: false,

      poll: {
        title: "",
        status: 0
      },

      errors: {
        title: "",
        status: ""
      },
      openedPoll: undefined
    };
    this.state = this.DEFAULT_STATE;
  }
  componentDidMount() {
    this.load();
  }

  /**
   * @description : load poll from the server
   *
   * @author Ali Aryani
   */
  load = () => {
    this.setState(this.DEFAULT_STATE);

    ItookApi.fetchPolls().then(
      res => {
        this.setState({ isLoading: false });

        console.log("res", res);

        if (res && res.status && res.status === 200 && res.data) {
          var rowNumber = 1;
          var poll = res.data;
          for (var i = 0; i < poll.length; i++) poll[i].row = rowNumber++;

          this.setState({
            data: poll,
            // filteredData: this.filterData(res.data.poll, "CUSTOMER"),
            isLoading: false
          });
        } else {
          this.setState({
            data: undefined,
            isLoading: false,
            isSnackOpen: true,
            snackbarMessage: res && res.data ? res.data.message : void 0
          });
        }
      },
      err => {
        this.setState({ isLoading: false });
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
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

  handleClickOpen = () => {
    this.setState({ openModal: true });
  };

  handleClickDeleteOpen = () => {
    console.log("open");
    this.setState({ OpenDeleteModal: true });
  };
  handleCloseDelete = () => {
    this.setState({ OpenDeleteModal: false });
  };
  handleClose = () => {
    this.setState({
      openModal: false,
      errors: {
        title: "",
        status: ""
      },
      poll: {
        title: "",
        status: 0
      }
    });
  };

  handleEditClose = () => {
    this.setState({
      OpenEditModal: false,
      errors: {
        title: "",
        status: ""
      }
    });
  };

  /**
   * @description : Callback for form text fields data change
   *
   * @author Ali Aryani
   *
   * @param key (string)  : A string representing poll's property e.g : title, ...
   * @param data (string) : New value of form's text field for specified property
   *
   */
  handleTitleChange = title => {
    this.setState(
      {
        errors: { ...this.state.errors, title: "" },

        poll: {
          ...this.state.poll,
          title
        }
      },
      () => console.log("poll", this.state.poll)
    );
  };

  /**
   * @description : Callback for form text fields data change
   *
   * @author Ali Aryani
   *
   * @param key (string)  : A string representing poll's property e.g : title, ...
   * @param data (string) : New value of form's text field for specified property
   *
   */
  handleEditTitleChange = title => {
    console.log("title", title);
    this.setState(
      {
        // errors: { ...this.state.errors },
        errors: { ...this.state.errors, title: "" },

        openedPoll: { ...this.state.openedPoll, title }
      },
      () => console.log("openedPoll", this.state.openedPoll)
    );
  };

  /**
   * @description : Callback for touching add button
   *
   * @author Ali Aryani
   *
   */
  handleAddPoll = event => {
    event.preventDefault();

    this.setState({ busy: true });

    ItookApi.addPoll(this.state.poll).then(
      res => {
        if (res && res.status && res.status === 200) {
          // var rowNumber = 1;
          // var faqs = res.data.poll;
          // for (var i = 0; i < faqs.length; i++) faqs[i].row = rowNumber++;
          this.load();
          this.setState({
            busy: false,
            // filteredData: faqs,
            // appType: "all",

            snackbarMessage: "عملیات با موفقیت انجام شد",
            isSnackOpen: true,

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
        } else {
          this.setState({
            busy: false,
            isSnackOpen: true,
            snackbarMessage: res && res.data ? res.data.message : void 0
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
  };

  /**
   * @description : Callback for when one checkbox of table is touched
   *
   * @author Ali Aryani
   *
   * @param id (number) : The id of data presented on touched row
   */
  handleClick = (event, id) => {
    if (event.target.tagName === "INPUT") {
      const { selected } = this.state;
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      this.setState({ selected: newSelected });
    } else if (
      event.target.tagName === "path" ||
      event.target.tagName === "svg" ||
      event.target.tagName === "BUTTON"
    ) {
      // if (event.target.tagName === "path")
      console.log("ID", id);

      var polls = this.state.data;

      for (var i = 0; i < polls.length; i++) {
        if (polls[i].id === id) {
          var poll = polls[i];
          break;
        }
      }
      this.setState({
        OpenEditModal: true,
        openedPoll: poll
      });
    } else {
      browserHistory.push("Poll/" + id + "/questions");
    }
  };

  handleEditPoll = event => {
    event.preventDefault();

    this.setState({ busy: true });

    ItookApi.editPoll(this.state.openedPoll.id, this.state.openedPoll).then(
      res => {
        if (res && res.status === 200) {
          this.load();
          this.setState({
            snackbarMessage: "عملیات با موفقیت انجام شد",
            isSnackOpen: true,
            busy: false,
            OpenEditModal: false,

            errors: {
              name: ""
            }
          });
        } else if (res && res.status && res.status === 422) {
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
          isDoingTask: true,
          OpenEditModal: false,

          isSnackOpen: true,
          snackbarMessage: "خطا در برقراری با سرور"
        });
      }
    );
  };

  /**
   * @description : Sends a request to remove poll
   *
   * @author Ali Aryani
   *
   * @return server response
   */
  handleDeletePoll = () => {
    this.setState({ busy: true });

    var idsToBeRemoved = this.state.selected;
    // var idxxxxx = { id: idsToBeRemoved };
    // console.log("ids to remove", idxxxxx);
    ItookApi.removePoll(idsToBeRemoved).then(
      res => {
        if (res && res.status && res.status === 200) {
          this.load();

          this.setState({
            snackbarMessage: "عملیات با موفقیت انجام شد",
            isSnackOpen: true,
            OpenDeleteModal: false,
            selected: [],
            busy: false
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
          console.log("RESERROR", res);

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
          ? console.log("handledeleteData() failed with error :", err)
          : void 0;

        this.setState({
          isSnackOpen: true,
          busy: false,
          snackbarMessage: "خطا در انجام عملیات"
        });
      }
    );
  };

  handleChangeSelectFieldStatus = event => {
    console.log("event", event);
    this.setState(
      {
        poll: { ...this.state.poll, status: event }
      },
      () => console.log("groupId", this.state.groupId)
    );
  };

  handleEditChangeSelectFieldStatus = event => {
    console.log("groupId", event);
    this.setState(
      {
        openedPoll: { ...this.state.openedPoll, status: event }
      },
      () => console.log("groupId", this.state.groupId)
    );
  };

  renderAppbarActionsButtons = () => {
    var actionButtons = [];
    if (this.state.data && this.state.selected.length > 0) {
      actionButtons.push(
        <IconButton onClick={this.handleClickDeleteOpen}>
          <Delete />
        </IconButton>
      );
    }
    return actionButtons;
  };
  render() {
    var component = null;

    if (this.state.isLoading) {
      component = (
        <div style={{ marginTop: "15%" }}>
          <Loading />
        </div>
      );
    } else if (!this.state.data) {
      component = (
        <div style={{ marginTop: "15%" }}>
          <Grid container justify="center" alignItems="center">
            {OPERATION_FAILED}
          </Grid>

          <p
            style={{ fontSize: ".8rem", color: "#999999", textAlign: "center" }}
          >
            خطا در دریافت اطلاعات از سرور
          </p>
        </div>
      );
    } else {
      component = (
        <PollUI
          OnClickOpen={this.handleClickOpen}
          OnClickDeleteOpen={this.handleClickDeleteOpen}
          OnCloseModalDelete={this.handleCloseDelete}
          OpenModal={this.state.openModal}
          OpenEditModal={this.state.OpenEditModal}
          OpenDeleteModal={this.state.OpenDeleteModal}
          poll={this.state.poll}
          busy={this.state.busy}
          data={this.state.data}
          OnEditPoll={this.handleEditPoll}
          OnCloseModal={this.handleClose}
          OnCloseEdit={this.handleEditClose}
          CloseEditModal={this.OpenEditModal}
          OnAddPoll={this.handleAddPoll}
          OnDeletePoll={this.handleDeletePoll}
          onTitleChange={this.handleTitleChange}
          OnClick={this.handleClick}
          selected={this.state.selected}
          openedPoll={this.state.openedPoll}
          onEditTitleChange={this.handleEditTitleChange}
          errors={this.state.errors}
          onChangeSelectFieldStatus={this.handleChangeSelectFieldStatus}
          onEditChangeSelectFieldStatus={this.handleEditChangeSelectFieldStatus}
        />
      );
    }

    return (
      <Fragment>
        <AppLayout
          title="نظرسنجی"
          actionButtons={this.renderAppbarActionsButtons()}
        >
          <Grid>
            {component}
            {this.renderHelperComponents()}
          </Grid>
        </AppLayout>
      </Fragment>
    );
  }
}

export default connect(state => {
  return {
    user: state.user
  };
})(Poll);
