/**
 * @description : Users Component is main component for rendering UsersUI related.
 *
 * @method load
 * @method handleOpen
 * @method handleClose
 * @method handleFormDataChange
 * @method handleAddUser
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
import { Delete, Filter, Enseraf, Tik, ClearSearch } from "components/Icons";
import Loading from "containers/Loading";
import Snackbar from "@material-ui/core/Snackbar";
import { OPERATION_FAILED } from "components/StatesIcons";
import Grid from "@material-ui/core/Grid";
import { browserHistory } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import UsersUI from "./UsersUI";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

class Users extends Component {
  constructor(props) {
    super(props);
    this.DEFAULT_STATE = {
      snack: {
        open: false,
        snackbarMessage: ""
      },
      filter: {
        groupId: 0,
        searchQuery: "",
        status: 0
      },
      openModal: false,
      OpenDeleteModal: false,
      OpenEditModal: false,
      isLoading: true,
      OpenFilterModal: false,
      data: undefined,
      selected: [],
      filteredData: undefined,

      busy: false,
      appType: "all",
      GroupUsers: undefined,
      person: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        mobile: "",
        email: "",
        groupId: ""
      },

      errors: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        mobile: "",
        email: "",
        groupId: ""
      },
      openedUser: undefined
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

    this.fetchUsers();
  };

  fetchGroupUsers = () => {
    console.log("res");
    ItookApi.fetchGroupUsers().then(
      res => {
        // this.setState({ isLoading: false });
        console.log("res");
        if (res && res.status && res.status === 200 && res.data) {
          console.log("res", res);

          this.setState({
            GroupUsers: res.data
          });
        } else {
          this.setState({
            GroupUsers: undefined,
            isLoadingCategories: false,
            isSnackOpen: true,
            snackbarMessage: res.data.message
          });
        }
      },
      err => {
        this.setState({});
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
      }
    );
  };

  fetchUsers = () => {
    ItookApi.fetchUsers(this.state.filter).then(
      res => {
        this.setState({ isLoading: false });

        console.log("res", res);

        if (res && res.status && res.status === 200 && res.data) {
          var rowNumber = 1;
          var users = res.data.users;
          for (var i = 0; i < users.length; i++) users[i].row = rowNumber++;

          this.setState({
            data: users,
            filteredData: users,
            OpenFilterModal: false,
            // filteredData: this.filterData(res.data.group, "CUSTOMER"),
            isLoading: false
            // filter: {
            //   groupId: "",
            //   searchQuery: "",
            //   status: ""
            // }
          });
          this.fetchGroupUsers();
        } else {
          this.setState({
            data: undefined,
            isLoading: false,
            isSnackOpen: true,
            snackbarMessage: res.data.message
          });
        }
      },
      err => {
        this.setState({ isLoading: false });
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
      }
    );
  };

  renderFilterBody = () => {
    return (
      <div>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{
              fontFamily: "iransans",
              fontSize: ".9rem",
              margin: "8px"
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl style={{ margin: 4, minWidth: 60 }}>
                  <InputLabel
                    htmlFor="type"
                    style={{
                      fontFamily: "iransans",
                      fontSize: ".9rem"
                    }}
                  >
                    سمت
                  </InputLabel>
                  <Select
                    value={this.state.filter.groupId}
                    // error={this.props.errors.type.length > 0}
                    // formhelpertext={this.props.errors.type}
                    onChange={this.OnFilterChange}
                    input={<Input id="type" />}
                  >
                    <MenuItem
                      value={0}
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                      }}
                    >
                      همه
                    </MenuItem>
                    {this.state.GroupUsers
                      ? this.state.GroupUsers.map(n => {
                          return (
                            <MenuItem
                              value={n.id}
                              key={n.id}
                              style={{
                                fontFamily: "iransans",
                                fontSize: ".9rem"
                              }}
                            >
                              {n.displayName}
                            </MenuItem>
                          );
                        })
                      : void 0}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl style={{ margin: 4, minWidth: 60 }}>
                  <InputLabel
                    htmlFor="type"
                    style={{
                      fontFamily: "iransans",
                      fontSize: ".9rem"
                    }}
                  >
                    وضعیت
                  </InputLabel>
                  <Select
                    value={this.state.filter.status}
                    // error={this.props.errors.type.length > 0}
                    // formhelpertext={this.props.errors.type}
                    onChange={this.OnFilterStatusChange}
                    input={<Input id="type" />}
                  >
                    <MenuItem
                      value={0}
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                      }}
                    >
                      همه
                    </MenuItem>
                    <MenuItem
                      value={1}
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                      }}
                    >
                      فعال
                    </MenuItem>
                    <MenuItem
                      value={2}
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                      }}
                    >
                      غیر فعال
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </div>
    );
  };

  renderFilterDialog = () => {
    const { fullScreen } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.state.OpenFilterModal}
        // onClose={this.props.OnCloseModalDelete}
        aria-labelledby="responsive-title"
      >
        {/* <DialogTitle id="delet" style={{ textAlign: "center" }}>
          <Warning />
        </DialogTitle> */}

        <DialogContent>{this.renderFilterBody()}</DialogContent>
        <Grid
          container
          alignItems="center"
          justify="space-around"
          style={{ marginBottom: "8px" }}
        >
          <Button
            disabled={this.state.busy}
            onClick={this.handleCloseDelete}
            style={{
              fontFamily: "iransans",
              color: "#fff",
              fontSize: ".9rem",
              background: "#f44336"
            }}
          >
            بستن
            <Enseraf style={{ marginRight: 8 }} />
          </Button>

          {this.state.busy ? (
            <CircularProgress size={30} />
          ) : (
            <Button
              onClick={() => this.fetchUsers()}
              style={{
                color: "#fff",

                fontFamily: "iransans",
                fontSize: ".9rem",
                background: "#4caf50"
              }}
            >
              اعمال
              <Tik style={{ marginRight: 8 }} />
            </Button>
          )}
        </Grid>
      </Dialog>
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
        {this.renderFilterDialog()}
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
  handleClickFilterOpen = () => {
    console.log("open");
    this.setState({ OpenFilterModal: true });
  };

  handleCloseDelete = () => {
    this.setState({
      OpenDeleteModal: false,
      OpenFilterModal: false,
      filter: {
        groupId: "",
        searchQuery: "",
        status: ""
      }
    });
  };
  handleClose = () => {
    this.setState({
      openModal: false,
      errors: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        mobile: "",
        email: "",
        groupId: ""
      },
      person: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        mobile: "",
        email: "",
        groupId: ""
      }
    });
  };

  handleEditClose = () => {
    this.setState({
      OpenEditModal: false,
      errors: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        mobile: "",
        email: "",
        groupId: ""
      }
    });
  };

  /**
   * @description : Callback for form text fields data change
   *
   * @author Ali Aryani
   *
   * @param key (string)  : A string representing driver's property e.g : firstName, ...
   * @param data (string) : New value of form's text field for specified property
   *
   */
  handleFormDataChange = (key, data) => {
    this.setState({
      errors: { ...this.state.errors, [key]: "" },

      person: {
        ...this.state.person,
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

      openedUser: {
        ...this.state.openedUser,
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
  handleAddUser = event => {
    event.preventDefault();

    this.setState({ busy: true });

    ItookApi.addUser(this.state.person).then(
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

      var users = this.state.data;

      for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          var user = users[i];
          break;
        }
      }
      this.setState(
        {
          OpenEditModal: true,
          openedUser: user
        },
        () => console.log("user", this.state.openedUser)
      );
    } else {
      //   browserHistory.push("Users/" + id + "/posts");
      void 0;
    }
  };

  handleEditUser = event => {
    event.preventDefault();

    this.setState({ busy: true });

    ItookApi.EditUser(this.state.openedUser.id, this.state.openedUser).then(
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
          console.log("res", res);
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

  handleTypeEditChange = event => {
    this.setState({ type: event.target.value });

    this.setState(
      {
        openedUser: { ...this.state.openedUser, groupId: event.target.value },
        errors: { ...this.state.errors, groupId: "" }
      },
      () => {
        console.log("tyyyypee", this.state.person);
      }
    );
  };

  OnFilterChange = event => {
    console.log("event.target.value ", event.target.value);
    this.setState(
      {
        filter: { ...this.state.filter, groupId: event.target.value },
        errors: { ...this.state.errors, groupId: "" }
      },
      () => {
        console.log("filter", this.state.filter);
      }
    );
  };

  OnFilterStatusChange = event => {
    console.log("event.target.value ", event.target.value);
    this.setState(
      {
        filter: { ...this.state.filter, status: event.target.value },
        errors: { ...this.state.errors, status: "" }
      },
      () => {
        console.log("filter", this.state.filter);
      }
    );
  };

  handleChange = event => {
    this.setState({ type: event.target.value });

    this.setState(
      {
        person: { ...this.state.person, groupId: event.target.value },
        errors: { ...this.state.errors, groupId: "" }
      },
      () => {
        console.log("tyyyypee", this.state.person);
      }
    );
  };

  /**
   * @description : Callback for form text field user search change
   *
   * @author Ali Aryani
   *
   * @param event (string) : New value of  text field for search value
   *
   */

  search = event => {
    console.log("event", event);
    this.setState(
      {
        errors: { ...this.state.errors, event: "" },

        filter: {
          ...this.state.filter,
          searchQuery: event
        }
      },
      () => this.fetchUsers(),
      () => console.log("search", this.state.searchQuery)
    );
  };

  handleClearSearch = event => {
    console.log("event", event);
    this.setState(
      {
        errors: { ...this.state.errors, event: "" },

        filter: {
          ...this.state.filter,
          searchQuery: ""
        }
      },
      () => this.fetchUsers()
    );
  };

  /**
   * @description : Sends a request to remove group
   *
   * @author Ali Aryani
   *
   * @return server response
   */
  handleDeleteUser = () => {
    this.setState({ busy: true });

    var idsToBeRemoved = this.state.selected;
    // var idxxxxx = { id: idsToBeRemoved };
    // console.log("ids to remove", idxxxxx);
    ItookApi.removeUser(idsToBeRemoved).then(
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
  renderAppbarActionsButtons = () => {
    var actionButtons = [];
    if (this.state.data && this.state.selected.length > 0) {
      actionButtons.push(
        <IconButton onClick={this.handleClickDeleteOpen}>
          <Delete />
        </IconButton>
      );
    }

    // actionButtons.push(
    //   <IconButton
    //     onClick={this.handleClickFilterOpen}
    //     style={{ marginLeft: 80 }}
    //   >
    //     <Filter />
    //   </IconButton>
    // );

    actionButtons.push(
      <form
        onSubmit={e => {
          e.preventDefault();
          const { searchQuery } = e.currentTarget.elements;
          console.log("sd", searchQuery.value);
          this.search(searchQuery.value);
        }}
      >
        <Paper
          style={{
            display: "flex",
            alignItems: "center",
            width: 400,
            marginLeft: 180
          }}
        >
          <IconButton style={{ padding: 10 }} aria-label="Search" type="submit">
            <SearchIcon />
          </IconButton>
          {this.state.filter.searchQuery !== "" ? (
            <IconButton
              style={{ padding: 1 }}
              aria-label="Search"
              onClick={this.handleClearSearch}
            >
              <ClearSearch />
            </IconButton>
          ) : (
            void 0
          )}

          <InputBase
            name="searchQuery"
            style={{
              marginLeft: 8,
              flex: 1,
              direction: "rtl",
              fontFamily: "iransans",
              fontSize: ".9rem"
            }}
            defaultValue={this.state.filter.searchQuery}
            // onChange={e => {
            //   this.search(e.target.value);
            // }}
            placeholder="جستجو"
          />

          <Divider style={{ width: 1, height: 28, margin: 4 }} />
          <IconButton
            color="primary"
            onClick={this.handleClickFilterOpen}
            style={{ padding: 10 }}
            aria-label="Directions"
          >
            <Filter />
          </IconButton>
        </Paper>
      </form>
    );

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
        <UsersUI
          OnClickOpen={this.handleClickOpen}
          OnClickDeleteOpen={this.handleClickDeleteOpen}
          OnCloseModalDelete={this.handleCloseDelete}
          OpenModal={this.state.openModal}
          OpenEditModal={this.state.OpenEditModal}
          OpenDeleteModal={this.state.OpenDeleteModal}
          person={this.state.person}
          OnTypeChange={this.handleChange}
          OnTypeEditChange={this.handleTypeEditChange}
          busy={this.state.busy}
          data={this.state.filteredData}
          OnEditUser={this.handleEditUser}
          OnCloseModal={this.handleClose}
          OnCloseEdit={this.handleEditClose}
          CloseEditModal={this.OpenEditModal}
          OnAddUser={this.handleAddUser}
          OnDeleteUser={this.handleDeleteUser}
          onFormDataChange={this.handleFormDataChange}
          GroupUsers={this.state.GroupUsers}
          OnClick={this.handleClick}
          selected={this.state.selected}
          openedUser={this.state.openedUser}
          OnEditFormDataChange={this.handleEditFormDataChange}
          errors={this.state.errors}
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
          title="مدیریت کاربران"
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

export default connect()(Users);
