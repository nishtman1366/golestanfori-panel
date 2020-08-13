/**
 * @description : Contents Component is main component for rendering ContentsUI related.
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
import {
  Delete,
  AddBox,
  Filter,
  Enseraf,
  Tik,
  ClearSearch
} from "components/Icons";
import Grid from "@material-ui/core/Grid";
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
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Loading from "containers/Loading";
import Snackbar from "@material-ui/core/Snackbar";
import { OPERATION_FAILED } from "components/StatesIcons";
import { browserHistory } from "react-router";
import Tooltip from "@material-ui/core/Tooltip";

import ContentsUI from "./ContentsUI";

class Contents extends Component {
  constructor(props) {
    super(props);

    this.DEFAULT_STATE = {
      snack: {
        open: false,
        snackbarMessage: ""
      },
      postType: undefined,
      filter: {
        categoryId: 0,
        searchQuery: "",
        status: 0,
        userId: 0,
        postsTypeId: 0
      },
      OpenFilterModal: false,
      groupId: 1,
      groups: undefined,
      OpenDeleteModal: false,
      OpenAddToGroupModal: false,
      isLoading: true,
      news: undefined,
      links: undefined,
      categories: undefined,
      khabarnegar: undefined,
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
    this.fetchContents();
  };

  fetchContents = (url = null) => {
    this.setState({ isLoading: true });

    ItookApi.fetchContents(url, this.state.filter).then(
      res => {
        console.log("res", res);

        if (res && res.status && res.status === 200 && res.data) {
          var rowNumber = 1;
          var news = res.data;
          // var links = res.data.links;

          for (var i = 0; i < news.length; i++) news[i].row = rowNumber++;

          this.setState({
            news,
            // links,
            OpenFilterModal: false,
            // filteredData: transactions,
            // filteredData: this.filterData(res.data.match, "CUSTOMER"),
            isLoading: false
          });
        } else {
          this.setState({
            data: undefined,
            isLoading: false,
            isSnackOpen: true,
            snackbarMessage:
              res && res.data ? res.data.message : "خطای ناشناخته"
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
        <DialogContent
          style={{
            paddingtop: 24,
            paddingBottom: 24,
            paddingLeft: 34,
            paddingRight: 34
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            style={{
              fontFamily: "iransans",
              fontSize: ".9rem",
              margin: "16px"
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <FormControl style={{ margin: 4, minWidth: 90 }}>
                  <InputLabel
                    htmlFor="type"
                    style={{
                      fontFamily: "iransans",
                      fontSize: ".9rem"
                    }}
                  >
                    نوع خبر
                  </InputLabel>
                  <Select
                    value={this.state.filter.postsTypeId}
                    // error={this.props.errorsProducts.unitType}
                    // formhelpertext={this.props.errorsProducts.unitType}
                    onChange={this.OnPostTypeChange}
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
                    {this.state.postType
                      ? this.state.postType.map(n => {
                          return (
                            <MenuItem
                              value={n.id}
                              key={n.id}
                              style={{
                                fontFamily: "iransans",
                                fontSize: ".9rem"
                              }}
                            >
                              {n.name}
                            </MenuItem>
                          );
                        })
                      : void 0}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl style={{ margin: 4, minWidth: 90 }}>
                  <InputLabel
                    htmlFor="type"
                    style={{
                      fontFamily: "iransans",
                      fontSize: ".9rem"
                    }}
                  >
                    دسته بندی
                  </InputLabel>
                  <Select
                    value={this.state.filter.categoryId}
                    // error={this.props.errorsProducts.unitType}
                    // formhelpertext={this.props.errorsProducts.unitType}
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
                    {this.renderCategories(this.state.categories)}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl style={{ margin: 4, minWidth: 90 }}>
                  <InputLabel
                    htmlFor="type"
                    style={{
                      fontFamily: "iransans",
                      fontSize: ".9rem"
                    }}
                  >
                    خبرنگار
                  </InputLabel>
                  <Select
                    value={this.state.filter.userId}
                    // error={this.props.errors.type.length > 0}
                    // formhelpertext={this.props.errors.type}
                    onChange={this.OnKhabarnegarChange}
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
                    {this.state.khabarnegar
                      ? this.state.khabarnegar.map(n => {
                          return (
                            <MenuItem
                              value={n.id}
                              key={n.id}
                              style={{
                                fontFamily: "iransans",
                                fontSize: ".9rem"
                              }}
                            >
                              {n.name}
                            </MenuItem>
                          );
                        })
                      : void 0}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl style={{ margin: 4, minWidth: 90 }}>
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
                      درانتظار انتشار
                    </MenuItem>
                    <MenuItem
                      value={2}
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                      }}
                    >
                      انتشار یاقته
                    </MenuItem>
                    <MenuItem
                      value={3}
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                      }}
                    >
                      ویرایش شده
                    </MenuItem>
                    <MenuItem
                      value={4}
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                      }}
                    >
                      حذف شده
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

  renderCategories(categories) {
    var rows = null;

    if (
      categories === undefined ||
      categories === null ||
      categories.length === 0
    ) {
      return rows; // null
    }

    rows = this.createCategoryList(categories)
      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(n => {
        return (
          <MenuItem
            value={n.id}
            key={n.id}
            style={{
              fontFamily: "iransans",
              fontSize: ".9rem"
            }}
          >
            {n.name}
          </MenuItem>
        );
      });

    return rows;
  }
  /**
   * @description : halghe mizane bar rooye category ha va misazeshoon va harkodam ke zir majmooe dasht zir majmooeye anha ham sakhte mishe
   *
   * @author Ali Aryani
   */
  createCategoryList(categories) {
    var categoriesBundle = [];

    if (categories === undefined || categories === null) {
      return categoriesBundle;
    }

    categories.map(category => {
      categoriesBundle.push({
        id: category.id,
        productCount: category.productCount,

        name: this.createCategoryNameByLevel(category.name, category.level),
        postsCount: this.createCategoryNameByLevel(category.postsCount)
      });
      if (category.subCategories != null && category.subCategories.length > 0) {
        categoriesBundle = [
          ...categoriesBundle,
          ...this.createCategoryList(category.subCategories)
        ];
      }
      return void 0;
    });

    return categoriesBundle;
  }

  /**
   * @description : bad az sakhte shodan category ha ba in tabe anha ra ba khate tire joda karde
   *
   * @author Ali Aryani
   */
  createCategoryNameByLevel(name, level) {
    if (level === 1) {
      return name;
    }
    var newName = "";
    for (var i = 0; i < level - 1; i++) {
      newName += "  |  ";
    }
    return newName + " ---- " + name;
  }

  renderFilterDialog = () => {
    const { fullScreen } = this.props;

    return (
      <Dialog
        // style={{ maxHeight: "500px", width: "400px" }}
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
              onClick={() => this.fetchNews()}
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

  handleClickDeleteOpen = () => {
    console.log("open");
    this.setState({ OpenDeleteModal: true });
  };
  handleCloseDelete = () => {
    this.setState({
      OpenDeleteModal: false,
      OpenFilterModal: false,
      filter: {
        categoryId: "",
        searchQuery: "",
        status: ""
      }
    });
  };
  handleClickFilterOpen = () => {
    console.log("open");
    this.setState({ OpenFilterModal: true });
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
    console.log("dasdasd", event.target);
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
      browserHistory.push("editContents/" + id);
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

  OnPostTypeChange = event => {
    console.log("event.target.value ", event.target.value);
    this.setState(
      {
        filter: { ...this.state.filter, postsTypeId: event.target.value },
        errors: { ...this.state.errors, postsTypeId: "" }
      },
      () => {
        console.log("filter", this.state.filter);
      }
    );
  };

  OnKhabarnegarChange = event => {
    console.log("event.target.value ", event.target.value);
    this.setState(
      {
        filter: { ...this.state.filter, userId: event.target.value },
        errors: { ...this.state.errors, userId: "" }
      },
      () => {
        console.log("filter", this.state.filter);
      }
    );
  };

  OnFilterChange = event => {
    console.log("event.target.value ", event.target.value);
    this.setState(
      {
        filter: { ...this.state.filter, categoryId: event.target.value },
        errors: { ...this.state.errors, categoryId: "" }
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
      () => this.fetchNews()
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
    ItookApi.removeContents(idsToBeRemoved).then(
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
      () => this.fetchNews()
    );
  };

  renderAppbarActionsButtons = () => {
    var actionButtons = [];
    if (this.state.selected.length > 0) {
      actionButtons.push(
        <div>
          <IconButton onClick={this.handleClickDeleteOpen}>
            <Delete />
          </IconButton>

          {/* <Tooltip title="افزودن خبر به گروه" style={{ fontSize: 24 }}>
            <IconButton onClick={this.handleClickAddToGroupOpen}>
              <AddBox />
            </IconButton>
          </Tooltip> */}
        </div>
      );
    }
    // actionButtons.push(
    //   <form
    //     onSubmit={e => {
    //       e.preventDefault();
    //       const { searchQuery } = e.currentTarget.elements;
    //       console.log("sd", searchQuery.value);
    //       this.search(searchQuery.value);
    //     }}
    //   >
    //     <Paper
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         width: 400,
    //         marginLeft: 180
    //       }}
    //     >
    //       <IconButton style={{ padding: 10 }} aria-label="Search" type="submit">
    //         <SearchIcon />
    //       </IconButton>
    //       {this.state.filter.searchQuery !== "" ? (
    //         <IconButton
    //           style={{ padding: 1 }}
    //           aria-label="Search"
    //           onClick={this.handleClearSearch}
    //         >
    //           <ClearSearch />
    //         </IconButton>
    //       ) : (
    //         void 0
    //       )}
    //       <InputBase
    //         name="searchQuery"
    //         style={{
    //           marginLeft: 8,
    //           flex: 1,
    //           direction: "rtl",
    //           fontFamily: "iransans",
    //           fontSize: ".9rem"
    //         }}
    //         defaultValue={this.state.filter.searchQuery}
    //         // onChange={e => {
    //         //   this.search(e.target.value);
    //         // }}
    //         placeholder="جستجو"
    //       />

    //       <Divider style={{ width: 1, height: 28, margin: 4 }} />
    //       <IconButton
    //         color="primary"
    //         onClick={this.handleClickFilterOpen}
    //         style={{ padding: 10 }}
    //         aria-label="Directions"
    //       >
    //         <Filter />
    //       </IconButton>
    //     </Paper>
    //   </form>
    // );

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
        <ContentsUI
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
          OnFetch={this.fetchNews}
        />
      );
    }

    return (
      <Fragment>
        <AppLayout
          title="مدیریت محتوا"
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

export default connect(state => {
  return {
    user: state.user
  };
})(Contents);
