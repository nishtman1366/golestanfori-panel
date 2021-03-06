/**
 * @description : AddNews Component is main component for rendering AddNewsUI related.
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

import AddNewsUI from "./AddNewsUI";

class AddNews extends Component {
  constructor(props) {
    super(props);

    this.DEFAULT_STATE = {
      snack: {
        open: false,
        snackbarMessage: ""
      },
      filteredCategories: undefined,
      filteredCategories2: undefined,

      tags: undefined,
      tag: [],
      FilterTags: undefined,
      isLoadingtags: true,
      newTag: "",
      isLoadingPostType: true,
      isLoadingCategories: true,
      isLoadingKhabarnegar: true,
      isLoadingPublisher: true,
      isLoadingPostCreatType: true,

      news: {
        categoryId: "", //dastebandi
        categoryIds: [],
        // editorId: "", //virastar
        postsCreateTypeId: "", //shiveye tolid
        postsTypeId: "", //noe khabar
        publisherId: "", //montasher konande
        userId: "", // khabarnegar,
        groupId: "", //grouhe khabar,
        groupPosition: "",
        homePage: 0,
        lead: "", //lead
        title: "", //titr khabr
        preTitle: "", //roo titir
        postTitle: "", //zire titr
        testImage: null,
        galleryImages: [],
        body: "",
        videos: [],
        graphics: [],

        template: "",
        photographer: "",
        code: "",
        tag: [],
        source: ""
      },
      selected: [],
      newsImage: null,
      galleryImages: [],
      graphics: [],
      subCategoryId: null,
      errors: {
        categoryId: "", //dastebandi
        categoryIds: "",
        postsCreateTypeId: "", //shiveye tolid
        postsTypeId: "", //noe khabar
        publisherId: "", //montasher konande
        userId: "", // khabarnegar,
        groupId: "", //grouhe khabar,
        groupPosition: "",
        homePage: 0,
        lead: "", //lead
        title: "", //titr khabr
        preTitle: "", //roo titir
        postTitle: "", //zire titr
        testImage: "",
        galleryImages: "",
        body: "",
        videos: "",
        graphics: "",

        template: "",
        photographer: "",
        code: "",
        tag: "",
        source: ""
      },
      busy: false,
      postType: undefined,
      categories: undefined,
      subCategories: undefined,
      subCategoriesList: undefined,

      khabarnegar: undefined,
      virastar: undefined,
      publisher: undefined,
      postCreatType: undefined,
      groups: undefined
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
    this.fetchPostType();
    this.fetchCategories();
    this.fetchKhabarNegar();
    // this.fetchVirastar();
    this.fetchPublisher();
    this.fetchPostCreateType();
    this.fetchGroups();
    this.fetchTags();
  };

  fetchTags = () => {
    console.log("res");
    ItookApi.fetchTags().then(
      res => {
        // this.setState({ isLoading: false });
        console.log("res");
        if (res && res.status && res.status === 200 && res.data) {
          console.log("res", res);

          this.setState({
            tags: res.data,
            isLoadingtags: false
          });
        } else {
          this.setState({ postType: undefined, isLoadingtags: false });
        }
      },
      err => {
        this.setState({});
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
      }
    );
  };

  fetchPostType = () => {
    console.log("res");
    ItookApi.fetchPostType().then(
      res => {
        // this.setState({ isLoading: false });
        console.log("res");
        if (res && res.status && res.status === 200 && res.data) {
          console.log("res", res);

          this.setState({
            postType: res.data,
            isLoadingPostType: false
          });
        } else {
          this.setState({ postType: undefined, isLoadingPostType: false });
        }
      },
      err => {
        this.setState({});
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
      }
    );
  };

  fetchCategories = () => {
    console.log("res");
    ItookApi.fetchCategriesList().then(
      res => {
        // this.setState({ isLoading: false });
        console.log("res");
        if (res && res.status && res.status === 200 && res.data) {
          console.log("res", res);

          this.setState(
            {
              categories: res.data,
              filteredCategories: res.data,
              filteredCategories2: res.data,

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
   * @description : Callback for form text field user search change
   *
   * @author Ali Aryani
   *
   * @param event (string) : New value of  text field for search value
   *
   */

  handleTextFildeSearch2 = event => {
    var filteredData = [];

    if (event === "") {
      filteredData = this.state.categories;
    } else if (this.state.categories) {
      filteredData = this.createSearchData2(this.state.categories, event);
    }

    // console.log("filteredData", filteredData);

    this.setState(
      {
        filteredCategories2: filteredData
      }
      // () => console.log("search", this.state.filteredData)
    );
  };

  createSearchData2(categories, query, result = []) {
    for (var key in categories) {
      if (categories[key].name.indexOf(query) >= 0) {
        // Save
        result.push(categories[key]);
      }
      if (categories[key].subCategories != null)
        this.createSearchData2(categories[key].subCategories, query, result);
    }
    return result;
  }

  fetchKhabarNegar = () => {
    console.log("res");
    ItookApi.fetchKhabarNegar().then(
      res => {
        // this.setState({ isLoading: false });
        console.log("res");
        if (res && res.status && res.status === 200 && res.data.users) {
          console.log("res", res);
          var userId = this.props.user.id;
          var publisherId = this.props.user.id;

          this.setState({
            khabarnegar: res.data.users,
            isLoadingKhabarnegar: false,
            news: {
              ...this.state.news,
              userId,
              publisherId
            }
          });
        } else {
          this.setState({
            khabarnegar: undefined,
            isLoadingKhabarnegar: false
          });
        }
      },
      err => {
        this.setState({});
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
      }
    );
  };

  // fetchVirastar = () => {
  //   console.log("res");
  //   ItookApi.fetchVirastar().then(
  //     res => {
  //       // this.setState({ isLoading: false });
  //       console.log("res", res);
  //       if (res && res.status && res.status === 200 && res.data.users) {
  //         console.log("res", res);

  //         this.setState({
  //           virastar: res.data.users,
  //           isLoadingVirastar: false
  //         });
  //       } else {
  //         this.setState({ virastar: undefined, isLoadingVirastar: false });
  //       }
  //     },
  //     err => {
  //       this.setState({});
  //       process.env.NODE_ENV === "development" ? console.log(err) : void 0;
  //     }
  //   );
  // };

  fetchPublisher = () => {
    console.log("res");
    ItookApi.fetchPublisher().then(
      res => {
        // this.setState({ isLoading: false });
        console.log("res", res);
        if (res && res.status && res.status === 200 && res.data.users) {
          console.log("res", res);

          this.setState({
            publisher: res.data.users,
            isLoadingPublisher: false
          });
        } else {
          this.setState({ publisher: undefined, isLoadingPublisher: false });
        }
      },
      err => {
        this.setState({});
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
      }
    );
  };

  fetchPostCreateType = () => {
    console.log("res");
    ItookApi.fetchPostCreateType().then(
      res => {
        // this.setState({ isLoading: false });
        console.log("res");
        if (res && res.status && res.status === 200 && res.data) {
          console.log("res", res);

          this.setState({
            postCreatType: res.data,
            isLoadingPostCreatType: false
          });
        } else {
          this.setState({
            postCreatType: undefined,
            isLoadingPostCreatType: false
          });
        }
      },
      err => {
        this.setState({});
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

  /**
   * @description : Creates a form data
   *
   * @author Ali Aryani
   *
   * @return FormData object
   */
  createFormData = key => {
    let formData = new FormData();

    formData.append(
      "categoryId",

      this.state.news.categoryId
    );

    for (var k in this.state.news.categoryIds) {
      if (this.state.news.categoryIds.hasOwnProperty(k)) {
        if (this.state.news.categoryIds[k] !== "") {
          formData.append(
            "categoryIds[" + k + "]",
            this.state.news.categoryIds[k]
          );
        }
      }
    }

    formData.append("editorId", this.state.news.editorId);
    formData.append("postsCreateTypeId", this.state.news.postsCreateTypeId);
    formData.append("postsTypeId", this.state.news.postsTypeId);
    formData.append("publisherId", this.state.news.publisherId);
    formData.append("userId", this.state.news.userId);
    formData.append("lead", this.state.news.lead);
    formData.append("title", this.state.news.title);
    formData.append("preTitle", this.state.news.preTitle);
    formData.append("postTitle", this.state.news.postTitle);
    formData.append("testImage", this.state.newsImage);
    formData.append("code", this.state.news.code);
    formData.append("source", this.state.news.source);
    formData.append("template", this.state.news.template);
    formData.append("homePage", this.state.news.homePage);
    formData.append("groupId", this.state.news.groupId);
    formData.append("groupPosition", this.state.news.groupPosition);
    formData.append("body", this.state.news.body);
    formData.append("photographer", this.state.news.photographer);
    // formData.append("tags", this.state.tag);

    for (var k in this.state.news.tag) {
      if (this.state.news.tag.hasOwnProperty(k)) {
        if (this.state.news.tag[k] !== "") {
          formData.append("tags[" + k + "]", this.state.news.tag[k]);
        }
      }
    }

    for (var k in this.state.galleryImages) {
      if (this.state.galleryImages.hasOwnProperty(k)) {
        if (this.state.galleryImages[k] !== "") {
          formData.append("images[" + k + "]", this.state.galleryImages[k]);
        }
      }
    }

    for (var k in this.state.graphics) {
      if (this.state.graphics.hasOwnProperty(k)) {
        if (this.state.graphics[k] !== "") {
          formData.append("graphics[" + k + "]", this.state.graphics[k]);
        }
      }
    }

    for (var k in this.state.news.videos) {
      if (this.state.news.videos.hasOwnProperty(k)) {
        if (this.state.news.videos[k] !== "") {
          formData.append("videos[" + k + "]", this.state.news.videos[k]);
        }
      }
    }

    // formData.append("images", this.state.galleryImages);

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
        news: { ...this.state.news, categoryIds: newSelected }
        // content: {
        //   ...this.state.content,
        //   categoryId: event.target.value
        // }
        // errors: { ...this.state.errors, type: "" }
      },
      () => {
        console.log("this.state.content", this.state.news);
      }
    );
  };

  handleCategoryChange = id => {
    this.setState(
      {
        news: { ...this.state.news, categoryId: id }
      },
      () => console.log("subCategoryId", this.state.news)
    );
  };

  /**
   * @description : Callback for touching add button
   *
   * @author Ali Aryani
   *
   */
  handleAddNews = event => {
    if (event !== undefined) {
      event.preventDefault();
    }

    this.setState({ busy: true });

    ItookApi.addNews(this.createFormData()).then(
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
            openModal: false,
            news: {
              categoryId: "", //dastebandi
              // editorId: "", //virastar
              postsCreateTypeId: "", //shiveye tolid
              postsTypeId: "", //noe khabar
              publisherId: "", //montasher konande
              userId: "", // khabarnegar,
              groupId: "", //grouhe khabar,
              groupPosition: "",
              homePage: 0,
              lead: "", //lead
              title: "", //titr khabr
              preTitle: "", //roo titir
              postTitle: "", //zire titr
              testImage: null,
              galleryImages: [],
              body: "",
              videos: [],
              graphics: [],

              template: "",
              photographer: "",
              code: "",
              tag: [],
              source: ""
            }
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
  handleGalleryPictureChange = e => {
    if (e.target.files[0]) {
      if (
        ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"].indexOf(
          e.target.files[0].name.split(".").pop()
        ) !== -1
      ) {
        const galleryImages = Array.from(e.target.files);
        console.log("galleryImages", galleryImages);

        this.setState(
          { galleryImages: [...this.state.galleryImages, ...galleryImages] },
          () => console.log("galleryImages", this.state.news.galleryImages)
        );
        // const len = galleryImages.length;
        // for (let i = 0; i < len; i++)
        this.setState(
          {
            news: {
              ...this.state.news,
              galleryImages: [
                ...this.state.news.galleryImages,
                ...galleryImages
              ]
            }
            // categoryName: {
            //   ...this.state.categoryName,
            //   image: URL.createObjectURL(e.target.files[0])
            // }
          },
          () => console.log("galleryImages", this.state.news.galleryImages)
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
            newsImage: "",
            news: {
              ...this.state.news,
              testImage: null
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
            newsImage: "",
            news: {
              ...this.state.news,
              testImage: null
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
  handleGraphicChange = e => {
    if (e.target.files[0]) {
      if (
        ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG", "gif", "GIF"].indexOf(
          e.target.files[0].name.split(".").pop()
        ) !== -1
      ) {
        const graphics = Array.from(e.target.files);
        console.log("graphics", graphics);

        this.setState({ graphics: [...this.state.graphics, ...graphics] }, () =>
          console.log("graphics", this.state.news.graphics)
        );
        // const len = galleryImages.length;
        // for (let i = 0; i < len; i++)
        this.setState(
          {
            news: {
              ...this.state.news,
              graphics: [...this.state.news.graphics, ...graphics]
            }
            // categoryName: {
            //   ...this.state.categoryName,
            //   image: URL.createObjectURL(e.target.files[0])
            // }
          },
          () => console.log("graphics", this.state.news.graphics)
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
            graphics: "",
            news: {
              ...this.state.news,
              graphics: null
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
            newsImage: "",
            news: {
              ...this.state.news,
              testImage: null
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
            newsImage: e.target.files[0],
            news: {
              ...this.state.news,
              testImage: URL.createObjectURL(e.target.files[0])
            }
            // categoryName: {
            //   ...this.state.categoryName,
            //   image: URL.createObjectURL(e.target.files[0])
            // }
          },
          () => console.log("dsadsad", this.state.newsImage)
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
            newsImage: "",
            news: {
              ...this.state.news,
              testImage: null
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
            newsImage: "",
            news: {
              ...this.state.news,
              testImage: null
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
  handleVideoChange = e => {
    console.log("file", e.target.files[0]);

    // if (
    //   ["jpg", "jpeg", "png"].indexOf(
    //     e.target.files[0].name.split(".").pop()
    //   ) !== -1
    // ) {
    if (e.target.files[0]) {
      if (
        ["mp4", "3gp", "ogg", "wmv", "wma"].indexOf(
          e.target.files[0].name.split(".").pop()
        ) !== -1
      ) {
        const videos = Array.from(e.target.files);
        this.setState(
          {
            news: {
              ...this.state.news,
              videos: [...this.state.news.videos, ...videos]
            }
          },
          () => console.log("videos", this.state.news.videos)
        );
      } else {
        setTimeout(() => {
          this.setState({
            isSnackOpen: true,
            snackbarMessage: "نوع فایل انتخابی معتبر نمی‌باشد"
          });
        }, 100);
      }
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

        news: { ...this.state.news, [key]: data }
      },
      console.log("data", this.state.news)
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

        news: { ...this.state.news, body: data }
      },
      () => console.log("data", this.state.news)
    );
  };

  handleRemoveVideos = index => {
    console.log("index", index);
    var videos = this.state.news.videos;
    videos.splice(index, 1);
    // for(var i=0; i<galleryImages.length;i++)
    // {
    //   if(galleryImages[i]===index)
    //   {

    //   }
    // }

    this.setState(
      {
        news: {
          ...this.state.news,
          videos
        }
      },
      () => console.log("videos", this.state.news.videos)
    );
  };

  handleAddNewTag = () => {
    var tag = this.state.news.tag;
    if (this.state.newTag.length > 0) {
      tag.push(this.state.newTag);

      this.setState(
        {
          news: {
            ...this.state.news,
            tag
          },
          newTag: ""
        },
        () => {
          console.log("tag", this.state.news.tag);
          // console.log("newTag", this.state.newTag);
        }
      );
    }
  };

  /**
   * @description : search in products data
   *
   * @author Ali Aryani
   */
  handleSuggestFildeSearch = text => {
    console.log("event", text);

    var data = this.state.tags;
    var filteredData = [];

    if (text === "") {
      filteredData = [];
      // this.setState({
      //   OpenedProduct: "",
      //   // openedFestival: { ...this.state.openedFestival, itemName: "", item: "" }
      // });
    } else if (data) {
      filteredData = data.filter(d => {
        return d.name.indexOf(text) >= 0;
      });
    }
    // var newTag = [];
    // newTag.push(text);
    this.setState(
      {
        FilterTags: filteredData,
        newTag: text
        // OpenedProduct: {
        //   ...this.OpenedProduct,
        //   title: text
        // }
        // searchText: text
      },
      () => console.log("newTag", this.state.newTag)
    );
  };

  /**
   * @description : callback when one product is touch
   *
   * @author Ali Aryani
   */
  handleClicTag = (event, id) => {
    console.log("id", id);
    console.log("this.state.news.tag", this.state.news.tag);

    var data = this.state.FilterTags;
    var tag = this.state.news.tag;
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        tag.push(data[i].name);
        console.log("data[i].name", data[i].name);
        break;
      }
    }
    this.setState(
      {
        news: {
          ...this.state.news,
          tag
        },
        newTag: "",
        FilterTags: undefined
      },
      () => {
        console.log("tag", this.state.news.tag);
      }
    );
  };

  handleDeleteChip = index => {
    console.log("index", index);
    var tag = this.state.news.tag;
    tag.splice(index, 1);
    // for(var i=0; i<galleryImages.length;i++)
    // {
    //   if(galleryImages[i]===index)
    //   {

    //   }
    // }

    this.setState(
      {
        news: {
          ...this.state.news,
          tag
        }
      },
      () => console.log("tag", this.state.tag)
    );
  };

  handleRemoveImage = index => {
    console.log("index", index);
    var galleryImages = this.state.news.galleryImages;
    galleryImages.splice(index, 1);
    // for(var i=0; i<galleryImages.length;i++)
    // {
    //   if(galleryImages[i]===index)
    //   {

    //   }
    // }

    this.setState(
      {
        news: {
          ...this.state.news,
          galleryImages
        }
      },
      () => console.log("galleryImages", this.state.news.galleryImages)
    );
  };

  handleRemoveGraphic = index => {
    console.log("index", index);
    var graphics = this.state.news.graphics;
    graphics.splice(index, 1);
    // for(var i=0; i<galleryImages.length;i++)
    // {
    //   if(galleryImages[i]===index)
    //   {

    //   }
    // }

    this.setState(
      {
        news: {
          ...this.state.news,
          graphics
        }
      },
      () => console.log("graphics", this.state.news.graphics)
    );
  };

  handleChangeAgeCheckbox = event => {
    console.log("event", event.target.checked);
    this.setState(
      {
        news: {
          ...this.state.news,
          homePage: event.target.checked === true ? 1 : 0
        }
      },
      () => console.log("news", this.state.news)
    );
  };

  handleChangeSelectFieldData = (key, event) => {
    console.log("news", event);
    this.setState(
      {
        news: {
          ...this.state.news,
          [key]: event
        },
        errors: { ...this.state.errors, [key]: "" }
      },
      () => console.log("news", this.state.news)
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

    if (
      this.state.isLoadingCategories ||
      this.state.isLoadingKhabarnegar ||
      this.state.isLoadingPostCreatType ||
      this.state.isLoadingPostType ||
      this.state.isLoadingPublisher
    ) {
      component = (
        <div style={{ marginTop: "15%" }}>
          <Loading />
        </div>
      );
    } else {
      console.log("tagssss", this.state.news.tag);
      component = (
        <AddNewsUI
          busy={this.state.busy}
          errors={this.state.errors}
          postType={this.state.postType}
          categories={this.state.categories}
          filteredCategories={this.state.filteredCategories}
          filteredCategories2={this.state.filteredCategories2}
          subCategories={this.state.subCategories}
          khabarnegar={this.state.khabarnegar}
          virastar={this.state.virastar}
          publisher={this.state.publisher}
          postCreatType={this.state.postCreatType}
          groups={this.state.groups}
          news={this.state.news}
          onChangeTextFieldData={this.handleChangeTextFieldData}
          onChangeSelectFieldData={this.handleChangeSelectFieldData}
          OnPictureChange={this.handlePictureChange}
          OnGalleryPictureChange={this.handleGalleryPictureChange}
          onAddNews={this.handleAddNews}
          onChangeEditor={this.handleChangeEditor}
          onVideoChange={this.handleVideoChange}
          onGraphicChange={this.handleGraphicChange}
          onChangeAgeCheckbox={this.handleChangeAgeCheckbox}
          onRemoveImage={this.handleRemoveImage}
          onRemoveVideos={this.handleRemoveVideos}
          onRemoveGraphic={this.handleRemoveGraphic}
          onDeleteChip={this.handleDeleteChip}
          SuggestSearch={this.handleSuggestFildeSearch}
          OnClicTag={this.handleClicTag}
          tag={this.state.tag}
          FilterTags={this.state.FilterTags}
          onAddNewTag={this.handleAddNewTag}
          newTag={this.state.newTag}
          onCategoriesChange={this.handleCategoriesChange}
          onCategoryChange={this.handleCategoryChange}
          subCategoryId={this.state.subCategoryId}
          selected={this.state.selected}
          search={this.handleTextFildeSearch}
          search2={this.handleTextFildeSearch2}
        />
      );
    }

    return (
      <Fragment>
        <AppLayout title="افزودن خبر">
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
})(AddNews);
