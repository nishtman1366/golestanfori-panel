/**
 * @description : Advertise Component is main component for rendering AdvertiseUI related.
 *
 * @method load
 * @method handleOpen
 * @method handleClose
 * @method handleFormDataChange
 * @method handleAddAdvertise
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

import AdvertiseUI from "./AdvertiseUI";

class Advertise extends Component {
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
      positions: undefined,
      data: undefined,
      selected: [],
      busy: false,
      appType: "all",

      advertise: {
        positionId: "",
        name: "",
        image: null,
        destinationUrl: "",
        target: null
      },
      advertiseImage: null,
      errors: {
        positionId: "",
        name: "",
        image: "",
        destinationUrl: "",
        target: ""
      },
      openedAdvertise: undefined
    };
    this.state = this.DEFAULT_STATE;
  }
  componentDidMount() {
    this.load();
  }

  /**
   * @description : load group from the server
   *
   * @author Ali Aryani
   */
  load = () => {
    this.setState(this.DEFAULT_STATE);

    ItookApi.fetchAdvertise().then(
      res => {
        this.setState({ isLoading: false });

        console.log("res", res);

        if (res && res.status && res.status === 200 && res.data) {
          var rowNumber = 1;
          var groups = res.data;
          for (var i = 0; i < groups.length; i++) groups[i].row = rowNumber++;

          this.setState({
            data: groups,
            // filteredData: this.filterData(res.data.group, "CUSTOMER"),
            isLoading: false
          });
          this.fetchPosition();
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

  fetchPosition = () => {
    ItookApi.fetchPosition().then(
      res => {
        this.setState({ isLoading: false });

        console.log("res", res);

        if (res && res.status && res.status === 200 && res.data) {
          var positions = res.data;

          this.setState({
            positions,
            OpenFilterModal: false,
            // filteredData: this.filterData(res.data.group, "CUSTOMER"),
            isLoading: false,
            filter: {
              groupId: "",
              searchQuery: "",
              status: ""
            }
          });
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
        positionId: "",
        name: "",
        image: "",
        destinationUrl: "",
        target: ""
      },
      advertise: {
        positionId: "",
        name: "",
        image: null,
        destinationUrl: "",
        target: null
      }
    });
  };

  handleEditClose = () => {
    this.setState({
      OpenEditModal: false,
      errors: {
        errors: {
          positionId: "",
          name: "",
          image: "",
          destinationUrl: "",
          target: ""
        }
      }
    });
  };

  /**
   * @description : Callback for form text fields data change
   *
   * @author Ali Aryani
   *
   * @param key (string)  : A string representing group's property e.g : title, ...
   * @param data (string) : New value of form's text field for specified property
   *
   */
  handleFormDataChange = (key, data) => {
    this.setState({
      errors: { ...this.state.errors, [key]: "" },

      advertise: {
        ...this.state.advertise,
        [key]: data
      }
    });
  };

  /**
   * @description : Callback for form text fields data change
   *
   * @author Ali Aryani
   *
   * @param key (string)  : A string representing group's property e.g : title, ...
   * @param data (string) : New value of form's text field for specified property
   *
   */
  handleEditFormDataChange = (key, data) => {
    this.setState({
      errors: { ...this.state.errors, [key]: "" },

      openedAdvertise: {
        ...this.state.openedAdvertise,
        [key]: data
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
    let formData = new FormData();
    formData.append("positionId", this.state.advertise.positionId);
    formData.append("name", this.state.advertise.name);
    formData.append("destinationUrl", this.state.advertise.destinationUrl);
    formData.append("target", this.state.advertise.target);
    formData.append("image", this.state.advertiseImage);

    return formData;
  };

  /**
   * @description : Callback for touching add button
   *
   * @author Ali Aryani
   *
   */
  handleAddAdvertise = event => {
    event.preventDefault();

    this.setState({ busy: true });

    ItookApi.addAdvertise(this.createFormData()).then(
      res => {
        if (res && res.status && res.status === 200) {
          // var rowNumber = 1;
          // var faqs = res.data.group;
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

      var advertises = this.state.data;

      for (var i = 0; i < advertises.length; i++) {
        if (advertises[i].id === id) {
          var advertise = advertises[i];
          break;
        }
      }
      this.setState({
        OpenEditModal: true,
        openedAdvertise: advertise
      });
    }
    // else {
    //   browserHistory.push("Advertise/" + id + "/posts");
    // }
  };

  /**
   * @description : Creates a form data
   *
   * @author Ali Aryani
   *
   * @return FormData object
   */
  createEditFormData = key => {
    let formData = new FormData();
    formData.append("positionId", this.state.openedAdvertise.positionId);
    formData.append("name", this.state.openedAdvertise.name);
    formData.append(
      "destinationUrl",
      this.state.openedAdvertise.destinationUrl
    );
    formData.append("target", this.state.openedAdvertise.target);
    formData.append("image", this.state.advertiseImage);

    return formData;
  };

  handleEditAdvertise = event => {
    event.preventDefault();

    this.setState({ busy: true });

    ItookApi.EditAdvertise(
      this.state.openedAdvertise.id,
      this.createEditFormData()
    ).then(
      res => {
        if (res && res.status === 200) {
          this.load();
          this.setState({
            snackbarMessage: "عملیات با موفقیت انجام شد",
            isSnackOpen: true,
            busy: false,
            OpenEditModal: false,

            errors: {
              alt: "",
              image: null,
              url: ""
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
          console.log("asdas", res);
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
   * @description : Callback for file of file browsing
   *
   * @author Ali Aryani
   *
   * @param event (object) : An event with file data
   *
   */
  handlePictureChange = e => {
    if (e.target.files[0]) {
      if (
        ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG", "gif", "GIF"].indexOf(
          e.target.files[0].name.split(".").pop()
        ) !== -1
      ) {
        console.log("dsadsad");
        this.setState({
          advertiseImage: e.target.files[0],
          advertise: {
            ...this.state.advertise,
            image: URL.createObjectURL(e.target.files[0])
          },
          errors: { ...this.state.errors, image: "" }

          // categoryName: {
          //   ...this.state.categoryName,
          //   image: URL.createObjectURL(e.target.files[0])
          // }
        });
      } else {
        setTimeout(() => {
          this.setState({
            isSnackOpen: true,
            snackbarMessage: "نوع فایل انتخابی معتبر نمی‌باشد",
            // fileMeli: null,
            // user: {
            //   ...this.state.user,
            //   fileMeli: ""
            // }
            advertiseImage: "",
            advertise: {
              ...this.state.advertise,
              image: null
            }
          });
        }, 100);
      }
    }
  };

  /**
   * @description : Callback for file of file browsing
   *
   * @author Ali Aryani
   *
   * @param event (object) : An event with file data
   *
   */
  handleEditPictureChange = e => {
    if (e.target.files[0]) {
      if (
        ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG", "gif", "GIF"].indexOf(
          e.target.files[0].name.split(".").pop()
        ) !== -1
      ) {
        console.log("dsadsad");
        this.setState({
          advertiseImage: e.target.files[0],
          openedAdvertise: {
            ...this.state.openedAdvertise,
            image: URL.createObjectURL(e.target.files[0])
          },
          errors: { ...this.state.errors, image: "" }

          // categoryName: {
          //   ...this.state.categoryName,
          //   image: URL.createObjectURL(e.target.files[0])
          // }
        });
      } else {
        setTimeout(() => {
          this.setState({
            isSnackOpen: true,
            snackbarMessage: "نوع فایل انتخابی معتبر نمی‌باشد",
            // fileMeli: null,
            // user: {
            //   ...this.state.user,
            //   fileMeli: ""
            // }
            advertiseImage: "",
            openedAdvertise: {
              ...this.state.openedAdvertise,
              image: null
            }
          });
        }, 100);
      }
    }
  };

  /**
   * @description : Sends a request to remove group
   *
   * @author Ali Aryani
   *
   * @return server response
   */
  handleDeleteAdvertise = () => {
    this.setState({ busy: true });

    var idsToBeRemoved = this.state.selected;
    // var idxxxxx = { id: idsToBeRemoved };
    // console.log("ids to remove", idxxxxx);
    ItookApi.removeAdvertise(idsToBeRemoved).then(
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

  handlePositionChange = event => {
    console.log("event.target.value ", event.target.value);
    this.setState(
      {
        advertise: { ...this.state.advertise, positionId: event.target.value },
        errors: { ...this.state.errors, positionId: "" }
      },
      () => {
        console.log("filter", this.state.advertise);
      }
    );
  };

  handleEditPositionChange = event => {
    console.log("event.target.value ", event.target.value);
    this.setState(
      {
        openedAdvertise: {
          ...this.state.openedAdvertise,
          positionId: event.target.value
        },
        errors: { ...this.state.errors, positionId: "" }
      },
      () => {
        console.log("filter", this.state.openedAdvertise);
      }
    );
  };

  handleTargetChange = event => {
    console.log("event.target.value ", event.target.value);
    this.setState(
      {
        advertise: { ...this.state.advertise, target: event.target.value },
        errors: { ...this.state.errors, target: "" }
      },
      () => {
        console.log("filter", this.state.advertise);
      }
    );
  };

  handleEditTargetChange = event => {
    console.log("event.target.value ", event.target.value);
    this.setState(
      {
        openedAdvertise: {
          ...this.state.openedAdvertise,
          target: event.target.value
        },
        errors: { ...this.state.errors, target: "" }
      },
      () => {
        console.log("openedAdvertise", this.state.openedAdvertise);
      }
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
        <AdvertiseUI
          OnClickOpen={this.handleClickOpen}
          OnClickDeleteOpen={this.handleClickDeleteOpen}
          OnCloseModalDelete={this.handleCloseDelete}
          OpenModal={this.state.openModal}
          OpenEditModal={this.state.OpenEditModal}
          OpenDeleteModal={this.state.OpenDeleteModal}
          advertise={this.state.advertise}
          OnPictureChange={this.handlePictureChange}
          OnEditPictureChange={this.handleEditPictureChange}
          busy={this.state.busy}
          data={this.state.data}
          OnEditAdvertise={this.handleEditAdvertise}
          OnCloseModal={this.handleClose}
          OnCloseEdit={this.handleEditClose}
          CloseEditModal={this.OpenEditModal}
          OnAddAdvertise={this.handleAddAdvertise}
          OnDeleteAdvertise={this.handleDeleteAdvertise}
          onFormDataChange={this.handleFormDataChange}
          OnClick={this.handleClick}
          selected={this.state.selected}
          openedAdvertise={this.state.openedAdvertise}
          OnEditFormDataChange={this.handleEditFormDataChange}
          errors={this.state.errors}
          positions={this.state.positions}
          OnPositionChange={this.handlePositionChange}
          OnEditPositionChange={this.handleEditPositionChange}
          OnTargetChange={this.handleTargetChange}
          OnEditTargetChange={this.handleEditTargetChange}
        />
        // );
        // component = (
        //   <Grid
        //     lg={4}
        //     md={4}
        //     sm={6}
        //     xs={11}
        //     style={{ marginTop: "10%", marginRight: "45%" }}
        //   >
        //     {USERS}
        //     <p style={{ fontSize: ".8rem", color: "#999999", marginRight: -15 }}>
        //       لیست رانندگان خالی است
        //     </p>
        //   </Grid>
      );
    }

    return (
      <Fragment>
        <AppLayout
          title="تبلیغات"
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

export default connect()(Advertise);
