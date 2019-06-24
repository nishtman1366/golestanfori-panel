/**
 * @description : News Component is main component for rendering NewsUI related.
 *
 * @method load
 * @method handleOpen
 * @method handleClose
 * @method handleFormDataChange
 * @method handleAddMatch
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
import { Delete, AddBox } from "components/Icons";
import Loading from "containers/Loading";
import Snackbar from "@material-ui/core/Snackbar";
import { OPERATION_FAILED } from "components/StatesIcons";
import Grid from "@material-ui/core/Grid";
import { browserHistory } from "react-router";
import Tooltip from "@material-ui/core/Tooltip";

import NewsUI from "./NewsUI";

class News extends Component {
  constructor(props) {
    super(props);

    this.DEFAULT_STATE = {
      snack: {
        open: false,
        snackbarMessage: ""
      },
      groups: undefined,
      OpenDeleteModal: false,
      OpenAddToGroupModal: false,
      isLoading: true,
      news: undefined,
      links: undefined,

      selected: [],
      busy: false,

      filteredData: undefined
    };
    this.state = this.DEFAULT_STATE;
  }
  componentDidMount() {
    this.load();
  }

  /**
   * @description : load match from the server
   *
   * @author Ali Aryani
   */
  load = () => {
    this.setState(this.DEFAULT_STATE);

    ItookApi.fetchNews().then(
      res => {
        this.setState({ isLoading: false });

        console.log("res", res);

        if (res && res.status && res.status === 200 && res.data) {
          var rowNumber = 1;
          var news = res.data.posts;
          var links = res.data.links;

          for (var i = 0; i < news.length; i++) news[i].row = rowNumber++;

          this.setState({
            news,
            links,
            // filteredData: transactions,
            // filteredData: this.filterData(res.data.match, "CUSTOMER"),
            isLoading: false
          });

          this.fetchGroups();
        } else {
          this.setState({ data: undefined, isLoading: false });
        }
      },
      err => {
        this.setState({ isLoading: false });
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
      }
    );
  };

  fetchGroups = () => {
    console.log("res");
    ItookApi.fetchgroups().then(
      res => {
        // this.setState({ isLoading: false });
        console.log("res");
        if (res && res.status && res.status === 200 && res.data) {
          console.log("res", res);

          this.setState({
            groups: res.data
          });
        } else {
          this.setState({ groups: undefined, isLoadingCategories: false });
        }
      },
      err => {
        this.setState({});
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

  handleClickDeleteOpen = () => {
    console.log("open");
    this.setState({ OpenDeleteModal: true });
  };
  handleCloseDelete = () => {
    this.setState({ OpenDeleteModal: false });
  };

  handleClickAddToGroupOpen = () => {
    console.log("open");
    this.setState({ OpenAddToGroupModal: true });
  };
  handleCloseAddToGroup = () => {
    this.setState({ OpenAddToGroupModal: false });
  };

  /**
   * @description : Callback for when one checkbox of table is touched
   *
   * @author Ali Aryani
   *
   * @param id (number) : The id of data presented on touched row
   */
  handleClick = (event, id) => {
    console.log("dasdasd", id);
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
    } else {
      browserHistory.push("editNews/" + id);
    }
  };

  handleChangeSelectFieldGroups = event => {
    console.log("groupId", event);
    this.setState(
      {
        groupId: event
      },
      () => console.log("groupId", this.state.groupId)
    );
  };

  /**
   * @description : Callback for touching add button
   *
   * @author Ali Aryani
   *
   */
  handleAddToGroup = event => {
    if (event !== undefined) {
      event.preventDefault();
    }
    var idsToBeRemoved = this.state.selected;
    this.setState({ busy: true });

    ItookApi.AddToGroup(this.state.groupId, idsToBeRemoved).then(
      res => {
        console.log("res", res);
        // console.log("this.state.openedCategory", this.state.openedCategory.id);

        if (res && res.status && res.status === 200) {
          // this.state.data.unshift({ ...this.state.user });
          this.load();
          this.setState({
            busy: false,
            // data: res.data,
            // openedCategory: null,
            snackbarMessage: "عملیات با موفقیت انجام شد",
            isSnackOpen: true,
            openModal: false
            // news: {
            //   categoryId: "", //dastebandi
            //   editorId: "", //virastar
            //   postsCreateTypeId: "", //shiveye tolid
            //   postsTypeId: "", //noe khabar
            //   publisherId: "", //montasher konande
            //   userId: "", // khabarnegar,
            //   lead: "", //lead
            //   title: "", //titr khabr
            //   preTitle: "", //roo titir
            //   postTitle: "", //zire titr
            //   testImage: null,
            //   body: ""
            // },
            // newsImage: null
            // errors: this.DEFAULT_STATE.errors
          });
        } else if (res.status && res.status === 422) {
          console.log("RESERROR", res.data.errors);

          var errors = this.state.errors;

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
   * @description : Sends a request to remove news
   *
   * @author Ali Aryani
   *
   * @return server response
   */
  handleDeleteNews = () => {
    this.setState({ busy: true });
    var idsToBeRemoved = this.state.selected;

    // var idxxxxx = { id: idsToBeRemoved };
    // console.log("ids to remove", idxxxxx);
    ItookApi.removeNews(idsToBeRemoved).then(
      res => {
        if (res && res.status && res.status === 200) {
          this.load();
          this.setState({
            snackbarMessage: "عملیات با موفقیت انجام شد",
            isSnackOpen: true,
            openModal: false,

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

  renderAppbarActionsButtons = () => {
    var actionButtons = [];
    if (this.state.selected.length > 0) {
      actionButtons.push(
        <div>
          <Tooltip title="حذف خبر">
            <IconButton onClick={this.handleClickDeleteOpen}>
              <Delete />
            </IconButton>
          </Tooltip>

          <Tooltip title="افزودن خبر به گروه" style={{ fontSize: 24 }}>
            <IconButton onClick={this.handleClickAddToGroupOpen}>
              <AddBox />
            </IconButton>
          </Tooltip>
        </div>
      );
    }
    return actionButtons;
  };
  render() {
    console.log("render");

    var component = null;

    if (this.state.isLoading) {
      component = (
        <div style={{ marginTop: "15%" }}>
          <Loading />
        </div>
      );
    } else if (!this.state.news) {
      component = (
        <div style={{ marginTop: "15%" }}>
          {/* <Grid container justify="center" alignItems="center">
            {OPERATION_FAILED}
          </Grid>

          <p
            style={{ fontSize: ".8rem", color: "#999999", textAlign: "center" }}
          >
            خطا در دریافت اطلاعات از سرور
          </p> */}
        </div>
      );
    } else {
      component = (
        // <p>dasdasd</p>
        <NewsUI
          OnClickDeleteOpen={this.handleClickDeleteOpen}
          OnCloseModalDelete={this.handleCloseDelete}
          OpenDeleteModal={this.state.OpenDeleteModal}
          OpenAddToGroupModal={this.state.OpenAddToGroupModal}
          OnCloseAddToGroup={this.handleCloseAddToGroup}
          news={this.state.news}
          links={this.state.links}
          busy={this.state.busy}
          OnClick={this.handleClick}
          selected={this.state.selected}
          OnDeleteNews={this.handleDeleteNews}
          groups={this.state.groups}
          onChangeSelectFieldGroups={this.handleChangeSelectFieldGroups}
          groupId={this.state.groupId}
          OnAddToGroup={this.handleAddToGroup}
        />
      );
    }

    return (
      <Fragment>
        <AppLayout
          title="مدیریت اخبار"
          actionButtons={this.renderAppbarActionsButtons()}
        >
          <Grid>
            {component}
            {/* <p>dasda</p> */}
            {this.renderHelperComponents()}
          </Grid>
        </AppLayout>
      </Fragment>
    );
  }
}

export default connect()(News);
