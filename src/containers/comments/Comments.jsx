import React, { Component, Fragment } from "react";
import AppLayout from "components/appLayout/AppLayout";
import ItookApi from "api/ItookApi";
import { connect } from "react-redux";
import CommentsUI from "./CommentsUI";
import IconButton from "@material-ui/core/IconButton";
import { Back } from "components/Icons";
import Loading from "containers/Loading";
import Snackbar from "@material-ui/core/Snackbar";
import { OPERATION_FAILED, NO_MESSAGE_RECIVED } from "components/StatesIcons";
import Grid from "@material-ui/core/Grid";
import { Delete } from "components/Icons";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.DEFAULT_STATE = {
      page: 0,
      rowsPerPage: 10,
      openModal: false,
      OpenDeleteModal: false,
      comments: undefined, // To hold all messages
      openedComment: {}, // To hold opened message data
      isLoading: true,
      isLoadingMessageDetails: false,
      selected: [],
      statusType: 4,

      snack: {
        open: false,
        snackbarMessage: ""
      }
    };
    this.state = this.DEFAULT_STATE;
  }

  componentDidMount() {
    this.load();
  }
  /**
   * @description : load  comments from the server
   *
   * @author Ali Aryani
   */
  load = () => {
    console.log("REdddS");
    this.setState(this.DEFAULT_STATE);

    ItookApi.fetchComments(this.props.routeParams.id).then(
      res => {
        var state = null;

        if (res && res.status && res.status === 200 && res.data) {
          console.log("RES", res);

          state = {
            comments: res.data,
            isLoading: false
          };
        } else {
          state = { comments: undefined, isLoading: false };
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
   * @description : Sends a request to remove comments
   *
   * @author Ali Aryani
   *
   * @return server response
   */
  handleDeleteComments = () => {
    this.setState({ busy: true });

    var idsToBeRemoved = this.state.selected;
    // var idxxxxx = { id: idsToBeRemoved };
    // console.log("ids to remove", idxxxxx);
    ItookApi.removeComments(idsToBeRemoved).then(
      res => {
        if (res && res.status && res.status === 200) {
          // var comments = null;

          // if (idsToBeRemoved.length > 0) {
          //   comments = this.state.comments.filter(data => {
          //     return idsToBeRemoved.indexOf(data.id) === -1;
          //   });
          // }
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

  /**
   * @description : Sends a request to confirm comments
   *
   * @author Ali Aryani
   *
   * @return server response
   */
  handleConfirmComment = event => {
    // event.preventDefault();

    // if (this.verifyEditUser()) {
    this.setState({ busy: true });

    ItookApi.EditComment(this.state.openedComment.id).then(
      res => {
        if (res && res.status === 200) {
          // var NewComments = null;

          // NewComments = this.state.comments.filter(data => {
          //   return this.state.openedComment.id !== data.id;
          // });
          this.load();
          this.setState({
            snackbarMessage: "عملیات با موفقیت انجام شد",
            isSnackOpen: true,
            busy: false,
            openModal: false,
            openedComment: {},
            selected: []
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
    // }
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
      openedComment: {}
    });
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

      this.setState({ selected: newSelected }, () =>
        console.log("ID", this.state.selected)
      );
    } else {
      // if (event.target.tagName === "path")
      console.log("ID", id);

      var comments = this.state.comments;

      for (var i = 0; i < comments.length; i++) {
        if (comments[i].id === id) {
          var comment = comments[i];
          break;
        }
      }
      this.setState(
        {
          openModal: true,
          openedComment: comment
        },
        () => console.log("openedComment", this.state.openModal)
      );
    }
  };

  renderAppbarActionsButtons = () => {
    var actionButtons = [];
    if (this.state.selected.length > 0) {
      actionButtons.push(
        <IconButton onClick={this.handleClickDeleteOpen}>
          <Delete />
        </IconButton>
      );
    }
    return actionButtons;
  };

  /**
   * @description : Renders ui by using InboxUI component
   *
   * @author Ali Aryani
   *
   * @return InboxUI component
   */
  render() {
    var component = null;

    if (this.state.isLoading) {
      component = (
        <div style={{ top: 32 }}>
          <Loading />
        </div>
      );
    } else if (this.state.comments === undefined) {
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
    } else if (this.state.comments.length > 0) {
      component = (
        <CommentsUI
          comments={this.state.comments}
          OnClickRow={this.handleClick}
          selected={this.state.selected}
          OnClickDeleteOpen={this.handleClickDeleteOpen}
          OnCloseModalDelete={this.handleCloseDelete}
          OpenModal={this.state.openModal}
          OpenDeleteModal={this.state.OpenDeleteModal}
          OnCloseModal={this.handleClose}
          openedComment={this.state.openedComment}
          OnDeleteComments={this.handleDeleteComments}
          OnConfirmComment={this.handleConfirmComment}
          busy={this.state.busy}
          statusType={this.state.statusType}
          OnStatusTypeChange={this.handleStatusTypeChange}
        />
      );
    } else if (!this.state.isLoading) {
      component = (
        <div style={{ marginTop: "15%" }}>
          <Grid container justify="center" alignItems="center">
            {NO_MESSAGE_RECIVED}
          </Grid>

          <p
            style={{ fontSize: ".8rem", color: "#999999", textAlign: "center" }}
          >
            نظری دریافت نشده است
          </p>
        </div>
      );
    }

    return (
      <Fragment>
        <AppLayout
          title="مدیریت نظرات"
          actionButtons={this.renderAppbarActionsButtons()}
        >
          {component}
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
        </AppLayout>
      </Fragment>
    );
  }
} //end of class

export default connect()(Comments);
