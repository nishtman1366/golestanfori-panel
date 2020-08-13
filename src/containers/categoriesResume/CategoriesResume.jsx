import React, { Component, Fragment } from "react";
import AppLayout from "components/appLayout/AppLayout";
import CategoriesResumeUI from "./CategoriesResumeUI";
import ItookApi from "api/ItookApi";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Save, Cancel } from "components/Icons";
import Loading from "containers/Loading";
// import { isNumber, validateMobile } from "helpers/Helpers";
import Snackbar from "@material-ui/core/Snackbar";
import { OPERATION_FAILED, USERS } from "components/StatesIcons";
import Grid from "@material-ui/core/Grid";
import { Back } from "components/Icons";
class CategoriesResume extends Component {
  constructor(props) {
    super(props);

    this.DEFAULT_STATE = {
      snack: {
        open: false,
        snackbarMessage: ""
      },

      openModal: false,

      category: {
        name: "",
        image: null
      },
      selected: [],
      openEditModal: false,
      OpenDeleteModal: false,

      categoryImage: "",
      openedCategory: null,

      data: undefined,
      isLoading: true,
      errors: {
        name: "",
        parentId: ""
      }
    };
    this.state = this.DEFAULT_STATE;
  }
  componentDidMount() {
    this.load();
  }

  handleClickOpen = () => {
    this.setState({ openModal: true });
  };
  handleClose = () => {
    this.setState({
      openModal: false,

      category: {
        name: "",
        image: null
      },
      errors: {
        name: "",
        parentId: ""
      },
      openedCategory: null
    });
  };

  handleClickEditOpen = () => {
    this.setState({ openEditModal: true });
  };
  handleEditClose = () => {
    this.setState({
      openEditModal: false,
      errors: {
        name: "",
        parentId: ""
      }
    });
  };

  handleClickDeleteOpen = () => {
    this.setState({ OpenDeleteModal: true });
  };
  handleDeleteClose = () => {
    this.setState({
      OpenDeleteModal: false
    });
  };

  /**
   * @description : load categories from the server
   *
   * @author Ali Aryani
   */
  load = () => {
    this.fetchCategries();
  };

  fetchCategries = () => {
    this.setState(this.DEFAULT_STATE);

    ItookApi.fetchCategoriesResume().then(
      res => {
        this.setState({ isLoading: false });

        console.log("res", res);

        if (res && res.status && res.status === 200 && res.data) {
          this.setState(
            {
              data: [...res.data],
              isLoading: false
            },
            () => {
              console.log("ids data", this.state.data);
            }
          );
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
        this.setState({
          categoryImage: e.target.files[0],
          category: {
            ...this.state.category,
            image: URL.createObjectURL(e.target.files[0])
          }
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
            categoryImage: "",
            category: {
              ...this.state.category,
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
            categoryImage: "",
            category: {
              ...this.state.category,
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
        ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"].indexOf(
          e.target.files[0].name.split(".").pop()
        ) !== -1
      ) {
        console.log("dsadsad");
        this.setState({
          categoryImage: e.target.files[0],
          categoryName: {
            ...this.state.categoryName,
            image: URL.createObjectURL(e.target.files[0])
          }
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
            categoryImage: ""
            // categoryName: {
            //   ...this.state.categoryName,
            //   image: null
            // }
          });
        }, 100);
      }
    } else {
      console.log("payam");
      // alert("warning");
      setTimeout(() => {
        this.setState(
          {
            categoryImage: "",
            // categoryName: {
            //   ...this.state.categoryName,
            //   image: null
            // },
            isSnackOpen: true,
            snackbarMessage: "حجم عکس انتخابی بیشتر از 120 کیلوبایت می‌باشد"
          },
          () => console.log("snack", this.state.isSnackOpen)
        );
      }, 100);
    }
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

    formData.append("name", this.state.category.name);
    formData.append("image", this.state.categoryImage);
    formData.append(
      "parentId",
      this.state.openedCategory !== null ? this.state.openedCategory : null
    );

    return formData;
  };

  /**
   * @description : Callback for when one checkbox of table is touched
   *
   * @author Ali Aryani
   *
   * @param id (number) : The id of data presented on touched row
   */
  handleClick = (event, id) => {
    console.log("event.target.value", event.target.value);
    console.log("id", id);

    console.log("tagName", event);

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
        console.log("selected", this.state.selected)
      );
    } else if (
      event.target.tagName === "path" ||
      event.target.tagName === "svg" ||
      event.target.tagName === "BUTTON"
    ) {
      var parentId = id;

      // for (var i = 0; i < categories.length; i++) {
      //   if (categories[i].id === id) {
      //     var category = categories[i];
      //     break;
      //   }
      // }
      this.setState(
        {
          openModal: true,
          openedCategory: parentId
        },
        () => {
          console.log("aaaaa", this.state.openedCategory);
        }
      );
    } else {
      var categories = this.state.data;
      var category = this.subCategoryFind(categories, id);
      console.log("searched category", category);
      this.setState(
        {
          openEditModal: true,
          categoryName: category
        },
        () => {
          console.log("aaaaa", this.state.categoryName);
        }
      );
      // this.fetchCategries();
      //   this.fetchCategoryById(id);
    }
  };

  subCategoryFind(categories, targetCategoryId) {
    if (categories == null) return null;

    for (let i = 0; i < categories.length; i++) {
      let category = categories[i];
      console.log("category name:", category);
      if (category.id === targetCategoryId) {
        return category;
      } else if (category.subCategories != null) {
        let cat = this.subCategoryFind(
          category.subCategories,
          targetCategoryId
        );
        if (cat != null) {
          return cat;
        }
      }
    }

    return null;
  }

  /**
   * @description : Callback for touching add button
   *
   * @author Ali Aryani
   *
   */
  handleAddCategory = event => {
    if (event !== undefined) {
      event.preventDefault();
    }

    // if (this.state.category.name === "") {
    //   this.setState({
    //     snackbarMessage: "نام دسته بندی را وارد کنید ",
    //     isSnackOpen: true
    //   });
    //   return false;
    // }

    this.setState({ busy: true });

    ItookApi.addResumeCategries(this.createFormData()).then(
      res => {
        console.log("res", res);
        console.log("this.state.category", this.state.category);
        // console.log("this.state.openedCategory", this.state.openedCategory.id);

        if (res && res.status && res.status === 200) {
          // this.state.data.unshift({ ...this.state.user });

          this.setState({
            busy: false,
            data: res.data,
            openedCategory: null,
            snackbarMessage: "عملیات با موفقیت انجام شد",
            isSnackOpen: true,
            openModal: false,
            category: {
              name: "",
              image: null
            },
            categoryImage: ""
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
   * @description : Creates a form data
   *
   * @author Ali Aryani
   *
   * @return FormData object
   */
  createEditFormData = key => {
    let formData = new FormData();

    formData.append("name", this.state.categoryName.name);
    formData.append("image", this.state.categoryImage);
    formData.append(
      "parentId",
      this.state.categoryName.parentId !== ""
        ? this.state.categoryName.parentId
        : null
    );

    return formData;
  };

  /**
   * @description :request to the server for edit categories
   *
   * @author Ali Aryani
   *
   */
  handleEditCategory = event => {
    if (event !== undefined) {
      event.preventDefault();
    }
    // if (this.state.categoryName.name === "") {
    //   this.setState({
    //     snackbarMessage: "نام دسته بندی را وارد کنید ",
    //     isSnackOpen: true
    //   });
    //   return false;
    // }
    console.log("handleEditCategory");

    this.setState({ busy: true });
    var id = this.state.categoryName.id;
    ItookApi.EditResumeCategory(id, this.createEditFormData()).then(
      res => {
        // console.log("this.state.category", this.state.category);
        // console.log("this.state.category", this.state.category);

        // console.log("this.state.openedCategory", this.state.openedCategory.id);

        if (res && res.status && res.status === 200) {
          var newCategories = res.data;
          // for (var i = 0; i < categories.length; i++) {
          //   if (categories[i].id === this.state.categoryName.id) {
          //     categories[i] = this.state.categoryName;
          //     break;
          //   }
          // }

          this.setState({
            busy: false,
            data: newCategories,
            openEditModal: false,
            snackbarMessage: "عملیات با موفقیت انجام شد",
            isSnackOpen: true,
            openModal: false,
            category: this.DEFAULT_STATE.category
            // errors: this.DEFAULT_STATE.errors
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

          this.setState({ busy: false, errors });
        } else if (res && res.status && res.status === 500) {
          console.log("RESERROR", res);

          this.setState({
            busy: false,
            isSnackOpen: true,
            snackbarMessage: "خطا در برقراری با سرور"
          });
        } else {
          console.log("RESERROR", res);

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

  OnEditCategoryNameChange = name => {
    // console.log("name", event);
    this.setState(
      {
        categoryName: { ...this.state.categoryName, name }
      },
      () => {
        console.log("categoryName", this.state.categoryName);
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
          autoHideDuration={2000}
          onClose={() => {
            this.setState({ isSnackOpen: false });
          }}
        />
      </div>
    );
  };

  handleCategoryTitleTextFieldValueChange = name => {
    // console.log("name", event);
    this.setState(
      {
        category: { ...this.state.category, name },
        errors: { ...this.state.errors, name: "" }
      },

      () => {
        console.log("name", this.state.category);
      }
    );
  };

  handleChangeParent = event => {
    this.setState(
      {
        categoryName: {
          ...this.state.categoryName,
          parentId: event.target.value
        }
        // errors: { ...this.state.errors, type: "" }
      },
      () => {
        console.log("sss", this.state.categoryName);
      }
    );
  };

  /**
   * @description : Sends a request to remove categories
   *
   * @author Ali Aryani
   *
   * @return server response
   */
  handleDeleteCategories = () => {
    this.setState({ busy: true });

    var idsToBeRemoved = this.state.selected;
    // var idxxxxx = { id: idsToBeRemoved };
    // console.log("ids to remove", idxxxxx);
    ItookApi.removeResumeCategories(idsToBeRemoved).then(
      res => {
        if (res && res.status && res.status === 200) {
          // var categories = null;
          // if (idsToBeRemoved.length > 0) {
          //   categories = this.state.data.filter(data => {
          //     return idsToBeRemoved.indexOf(data.id) === -1;
          //   });
          // }
          // var subCategories = this.state.data.subCategories.map(sub => {
          //   return { id: sub.id };
          // });
          // categories = subCategories.filter(data => {
          //   return idsToBeRemoved.indexOf(data.id) === -1;
          // });
          var newData = res.data;
          console.log("newData", res);

          this.setState({
            snackbarMessage: "عملیات با موفقیت انجام شد",
            isSnackOpen: true,
            OpenDeleteModal: false,
            selected: [],
            data: newData,
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
          console.log("newData", res);

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
        <IconButton onClick={this.handleClickDeleteOpen}>
          <Delete />
        </IconButton>
      );
    }
    // if (Object.keys(this.state.order).length > 0) {
    //   actionButtons.push(
    //     <div>
    //       <IconButton onClick={this.handleEditOrder}>
    //         <Save />
    //       </IconButton>
    //       <IconButton onClick={this.handleClickCancel}>
    //         <Cancel />
    //       </IconButton>
    //     </div>
    //   );
    // }
    return actionButtons;
  };

  render() {
    return (
      <Fragment>
        <AppLayout
          title="دسته بندی ها"
          actionButtons={this.renderAppbarActionsButtons()}
        >
          {this.renderMainUI()}
          {this.renderHelperComponents()}
        </AppLayout>
      </Fragment>
    );
  }

  renderMainUI = () => {
    console.log("errr", this.state.errors.name);
    return (
      <div>
        <CategoriesResumeUI
          data={this.state.data}
          isLoading={this.state.isLoading}
          OnClickOpen={this.handleClickOpen}
          OpenModal={this.state.openModal}
          OnCloseModal={this.handleClose}
          OnClickEditOpen={this.handleClickEditOpen}
          OpenEditModal={this.state.openEditModal}
          OnCloseEditModal={this.handleEditClose}
          OpenDeleteModal={this.state.OpenDeleteModal}
          OnCloseDeleteModal={this.handleDeleteClose}
          OnClickDeleteOpen={this.handleClickDeleteOpen}
          category={this.state.category}
          errors={this.state.errors}
          busy={this.state.busy}
          OnCategoryTitleChange={this.handleCategoryTitleTextFieldValueChange}
          OnAddCategory={this.handleAddCategory}
          OnPictureChange={this.handlePictureChange}
          OnEditPictureChange={this.handleEditPictureChange}
          selected={this.state.selected}
          OnClick={this.handleClick}
          categoryName={this.state.categoryName}
          OnEditCategory={this.handleEditCategory}
          OnEditCategoryNameChange={this.OnEditCategoryNameChange}
          OnChangeParent={this.handleChangeParent}
          OnDeleteCategories={this.handleDeleteCategories}
        />
      </div>
    );
  };
}

export default CategoriesResume;
