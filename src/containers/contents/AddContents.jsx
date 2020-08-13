/**
 * @description : AddContents Component is main component for rendering AddContentsUI related.
 *
 * @method load
 * @method handleOpen
 * @method handleClose
 * @method handleFormDataChange
 * @method handleAddTransaction
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

import AddContentsUI from "./AddContentsUI";

class AddContents extends Component {
  constructor(props) {
    super(props);

    this.DEFAULT_STATE = {
      snack: {
        open: false,
        snackbarMessage: ""
      },
      selected: [],
      content: {
        categoryIds: [], //dastebandi
        image: null,
        title: "", //titr khabr
        body: "",
        lead: ""
      },
      image: null,
      subCategoryId: null,
      errors: {
        categoryIds: "", //dastebandi
        image: "",
        title: "", //titr khabr
        body: "",
        lead: ""
      },
      filteredCategories: undefined,

      busy: false,
      categories: undefined,
      subCategories: undefined,
      subCategoriesList: undefined
    };
    this.state = this.DEFAULT_STATE;
  }
  componentDidMount() {
    this.load();
    console.log("props", this.props);
  }

  /**
   * @description : load data from the server
   *
   * @author Ali Aryani
   */
  load = () => {
    this.setState(this.DEFAULT_STATE);

    this.fetchCategories();
  };

  fetchCategories = () => {
    console.log("res");
    ItookApi.fetchContent().then(
      res => {
        // this.setState({ isLoading: false });
        console.log("res");
        if (res && res.status && res.status === 200 && res.data) {
          console.log("res", res);

          this.setState(
            {
              categories: res.data,
              filteredCategories: res.data,

              isLoadingCategories: false
            },
            () =>
              console.log(
                "this.state.subCategories",
                this.state.subCategoriesList
              )
          );
        } else {
          this.setState({ categories: undefined, isLoadingCategories: false });
        }
      },
      err => {
        this.setState({});
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
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

  handleTextFildeSearch = event => {
    var filteredData = [];

    if (event === "") {
      filteredData = this.state.categories;
    } else if (this.state.categories) {
      filteredData = this.createSearchData(this.state.categories, event);
    }

    // console.log("filteredData", filteredData);

    this.setState(
      {
        filteredCategories: filteredData
      }
      // () => console.log("search", this.state.filteredData)
    );
  };

  createSearchData(categories, query, result = []) {
    for (var key in categories) {
      if (categories[key].name.indexOf(query) >= 0) {
        // Save
        result.push(categories[key]);
      }
      if (categories[key].subCategories != null)
        this.createSearchData(categories[key].subCategories, query, result);
    }
    return result;
  }

  /**
   * @description : Creates a form data
   *
   * @author Ali Aryani
   *
   * @return FormData object
   */
  createFormData = key => {
    let formData = new FormData();

    for (var k in this.state.content.categoryIds) {
      if (this.state.content.categoryIds.hasOwnProperty(k)) {
        if (this.state.content.categoryIds[k] !== "") {
          formData.append(
            "categoryIds[" + k + "]",
            this.state.content.categoryIds[k]
          );
        }
      }
    }

    formData.append("title", this.state.content.title);
    formData.append("image", this.state.image);
    formData.append("body", this.state.content.body);
    formData.append("lead", this.state.content.lead);

    return formData;
  };

  handleCategoriesChange = id => {
    console.log("id", id);

    // const categories = this.state.categories;
    // const selected = [];

    // for (let i = 0; i < categories.length; i++) {
    //   if (categories[i].id === event.target.value) {
    //     selected.push(categories[i].id);
    //   }
    // }

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

    this.setState(
      {
        selected: newSelected,
        content: { ...this.state.content, categoryIds: newSelected }
        // content: {
        //   ...this.state.content,
        //   categoryId: event.target.value
        // }
        // errors: { ...this.state.errors, type: "" }
      },
      () => {
        console.log("this.state.content", this.state.content);
      }
    );
  };

  handleSubCategoryChange = event => {
    console.log("event", event.target.value);

    var id = event.target.value;

    this.setState(
      {
        subCategoryId: id
      },
      () => console.log("subCategoryId", this.state.subCategoryId)
    );
  };

  /**
   * @description : Callback for touching add button
   *
   * @author Ali Aryani
   *
   */
  handleAddContent = event => {
    if (event !== undefined) {
      event.preventDefault();
    }

    this.setState({ busy: true });

    ItookApi.addContent(this.createFormData()).then(
      res => {
        console.log("res", res);
        // console.log("this.state.openedCategory", this.state.openedCategory.id);

        if (res && res.status && res.status === 200) {
          // this.state.data.unshift({ ...this.state.user });
          this.load();
          this.setState({
            busy: false,

            snackbarMessage: "عملیات با موفقیت انجام شد",
            isSnackOpen: true
          });
        } else if (res && res.status && res.status === 422) {
          console.log("RESERROR", res.data.errors);

          var errors = this.state.errors;

          for (var key in res.data.errors) {
            var error =
              typeof res.data.errors[key] === "string"
                ? res.data.errors[key]
                : res.data.errors[key][0];
            errors[key] = error;
          }

          this.setState({
            busy: false,
            errors,
            isSnackOpen: true,
            snackbarMessage: "لطفا اطلاعات را به درستی وارد کنید"
          });
        } else if (res && res.status && res.status === 500) {
          this.setState({
            busy: false,
            isSnackOpen: true,
            snackbarMessage: "خطا در برقراری با سرور"
          });
        } else if (res) {
          console.log("RESERROR", res);

          this.setState({
            busy: false,
            isSnackOpen: true,
            snackbarMessage: res.data.message
          });
        } else {
          this.setState({
            busy: false,
            isSnackOpen: true,
            snackbarMessage: "خطای ناشناخته"
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
        ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"].indexOf(
          e.target.files[0].name.split(".").pop()
        ) !== -1
      ) {
        console.log("dsadsad");
        this.setState(
          {
            image: e.target.files[0],
            content: {
              ...this.state.content,
              image: URL.createObjectURL(e.target.files[0])
            },
            errors: { ...this.state.errors, image: "" }
            // categoryName: {
            //   ...this.state.categoryName,
            //   image: URL.createObjectURL(e.target.files[0])
            // }
          },
          () => console.log("image", this.state.image)
        );
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
            image: "",
            content: {
              ...this.state.content,
              image: null
            }
          });
        }, 100);
      }
    } else {
      console.log("payam");
      // alert("warning");
      setTimeout(() => {
        this.setState(
          {
            image: "",
            content: {
              ...this.state.content,
              image: null
            },
            isSnackOpen: true,
            snackbarMessage: "حجم عکس انتخابی بیشتر از 120 کیلوبایت می‌باشد"
          },
          () => console.log("snack", this.state.isSnackOpen)
        );
      }, 100);
    }
  };

  /**
   * @description : Callback for form text fields data change
   *
   * @author Ali Aryani
   *
   * @param key (string)  : A string representing match's property e.g : title, ...
   * @param data (string) : New value of form's text field for specified property
   *
   */
  handleChangeTextFieldData = (key, data) => {
    console.log("key", key);
    console.log("data", data);

    this.setState(
      {
        // errors: { ...this.state.errors },
        errors: { ...this.state.errors, [key]: "" },

        content: { ...this.state.content, [key]: data }
      },
      console.log("data", this.state.content)
    );
  };

  /**
   * @description : Callback for form text fields data change
   *
   * @author Ali Aryani
   *
   * @param key (string)  : A string representing match's property e.g : title, ...
   * @param data (string) : New value of form's text field for specified property
   *
   */
  handleChangeEditor = data => {
    console.log("data", data);

    this.setState(
      {
        // errors: { ...this.state.errors },

        content: { ...this.state.content, body: data }
      },
      () => console.log("data", this.state.content)
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

  render() {
    var component = null;

    if (this.state.isLoadingCategories) {
      component = (
        <div style={{ marginTop: "15%" }}>
          <Loading />
        </div>
      );
    } else {
      component = (
        <AddContentsUI
          busy={this.state.busy}
          errors={this.state.errors}
          filteredCategories={this.state.filteredCategories}
          subCategories={this.state.subCategories}
          content={this.state.content}
          onChangeTextFieldData={this.handleChangeTextFieldData}
          OnPictureChange={this.handlePictureChange}
          onAddContent={this.handleAddContent}
          onChangeEditor={this.handleChangeEditor}
          onCategoriesChange={this.handleCategoriesChange}
          onSubCategoryChange={this.handleSubCategoryChange}
          subCategoryId={this.state.subCategoryId}
          selected={this.state.selected}
          search={this.handleTextFildeSearch}
        />
      );
    }

    return (
      <Fragment>
        <AppLayout title="افزودن محتوا">
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
})(AddContents);
