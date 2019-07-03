/**
 * @description : EditNewsUI Component is main component for rendering EditNewsUI related.
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

import EditNewsUI from "./EditNewsUI";

class EditNews extends Component {
  constructor(props) {
    super(props);

    this.DEFAULT_STATE = {
      snack: {
        open: false,
        snackbarMessage: ""
      },
      isLoading: true,
      isLoadingPostType: true,
      isLoadingCategories: true,
      isLoadingKhabarnegar: true,
      isLoadingPublisher: true,
      isLoadingPostCreatType: true,
      newsData: undefined,
      images: [],
      graphics: [],

      videos: [],
      FilterTags: undefined,
      tags: undefined,
      localGraphics: { graphics: [] },
      localImages: { images: [] },

      localVideos: { videos: [] },
      newTag: "",
      tagList: { tagList: [] },
      deleteGraphics: [],
      deleteImages: [],

      deleteVideos: [],

      newsImage: null,
      errors: {
        categoryId: "", //dastebandi
        // editorId: "", //virastar
        postsCreateTypeId: "", //shiveye tolid
        postsTypeId: "", //noe khabar
        publisherId: "", //montasher konande
        userId: "", // khabarnegar,
        lead: "", //lead
        title: "", //titr khabr
        preTitle: "", //roo titir
        postTitle: "", //zire titr
        defaultImage: null,
        body: "",
        images: "",
        graphics: "",

        videos: ""
      },
      busy: false,
      publishing: false,
      postType: undefined,
      categories: undefined,
      khabarnegar: undefined,
      virastar: undefined,
      publisher: undefined,
      postCreatType: undefined
    };
    this.state = this.DEFAULT_STATE;
  }
  componentDidMount() {
    this.setState(this.DEFAULT_STATE);

    this.load();
    console.log("props", this.props.routeParams.id);
  }

  /**
   * @description : load data from the server
   *
   * @author Ali Aryani
   */
  load = () => {
    this.setState(this.DEFAULT_STATE);

    ItookApi.fetchNewsById(this.props.routeParams.id).then(
      res => {
        this.setState({ isLoading: false });

        console.log("res", res);

        if (res && res.status && res.status === 200 && res.data) {
          var tags = res.data.tags;
          var tagList = [];
          for (var i = 0; i < tags.length; i++) {
            tagList.push(tags[i].name);
            console.log("data[i].name", tags[i].name);
          }
          console.log("tagList", tagList);
          this.setState({
            newsData: res.data,
            tagList: {
              ...this.state.tagList,
              tagList
            },
            // filteredData: transactions,
            // filteredData: this.filterData(res.data.match, "CUSTOMER"),
            isLoading: false
          });

          this.fetchPostType();
          this.fetchCategories();
          this.fetchKhabarNegar();
          // this.fetchVirastar();
          this.fetchPublisher();
          this.fetchPostCreateType();
          this.fetchGroups();
          this.fetchTags();
        } else {
          this.setState({
            newsData: undefined,
            isLoading: false,
            isSnackOpen: true,
            snackbarMessage: res.data
          });
        }
      },
      err => {
        this.setState({ isLoading: false });
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
      }
    );
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
    ItookApi.fetchCategries().then(
      res => {
        // this.setState({ isLoading: false });
        console.log("res");
        if (res && res.status && res.status === 200 && res.data) {
          console.log("res", res);

          this.setState({
            categories: res.data,
            isLoadingCategories: false
          });
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

  fetchKhabarNegar = () => {
    console.log("res");
    ItookApi.fetchKhabarNegar().then(
      res => {
        // this.setState({ isLoading: false });
        console.log("res");
        if (res && res.status && res.status === 200 && res.data.users) {
          console.log("res", res);

          this.setState({
            khabarnegar: res.data.users,
            isLoadingKhabarnegar: false
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
    console.log("videos", this.state.deleteVideos);

    formData.append("categoryId", this.state.newsData.categoryId);
    formData.append("editorId", this.state.newsData.editorId);
    formData.append("postsCreateTypeId", this.state.newsData.postsCreateTypeId);
    formData.append("postsTypeId", this.state.newsData.postsTypeId);
    formData.append("publisherId", this.state.newsData.publisherId);
    formData.append("userId", this.state.newsData.userId);
    formData.append(
      "lead",
      this.state.newsData.lead !== null ? this.state.newsData.lead : ""
    );

    formData.append(
      "photographer",
      this.state.newsData.photographer !== null
        ? this.state.newsData.photographer
        : ""
    );

    formData.append(
      "postTitle",
      this.state.newsData.postTitle !== null
        ? this.state.newsData.postTitle
        : ""
    );

    formData.append(
      "preTitle",
      this.state.newsData.preTitle !== null ? this.state.newsData.preTitle : ""
    );
    formData.append(
      "source",
      this.state.newsData.source !== null ? this.state.newsData.source : ""
    );

    formData.append(
      "body",
      this.state.newsData.body !== null ? this.state.newsData.body : ""
    );

    formData.append("title", this.state.newsData.title);
    formData.append("code", this.state.newsData.code);
    formData.append("template", this.state.newsData.template);
    formData.append("homePage", this.state.newsData.homePage);
    formData.append("groupId", this.state.newsData.groupId);
    formData.append("groupPosition", this.state.newsData.groupPosition);

    formData.append(
      "testImage",
      this.state.newsImage !== null ? this.state.newsImage : void 0
    );
    // formData.append("deleteImages", this.state.deleteImages);
    // formData.append("deleteVideos", this.state.deleteVideos);

    for (var k in this.state.deleteVideos) {
      console.log("videos", this.state.deleteVideos);

      if (this.state.deleteVideos.hasOwnProperty(k)) {
        if (this.state.deleteVideos[k] !== "") {
          formData.append(
            "deletedVideos[" + k + "]",
            this.state.deleteVideos[k]
          );
        }
      }
    }

    for (var i in this.state.deleteGraphics) {
      if (this.state.deleteGraphics.hasOwnProperty(i)) {
        if (this.state.deleteGraphics[i] !== "") {
          formData.append(
            "deletedGraphics[" + i + "]",
            this.state.deleteGraphics[i]
          );
        }
      }
    }

    for (var l in this.state.deleteImages) {
      if (this.state.deleteImages.hasOwnProperty(l)) {
        if (this.state.deleteImages[l] !== "") {
          formData.append(
            "deletedImages[" + l + "]",
            this.state.deleteImages[l]
          );
        }
      }
    }

    for (var j in this.state.tagList.tagList) {
      if (this.state.tagList.tagList.hasOwnProperty(j)) {
        if (this.state.tagList.tagList[j] !== "") {
          formData.append("tags[" + j + "]", this.state.tagList.tagList[j]);
        }
      }
    }

    for (var m in this.state.images) {
      if (this.state.images.hasOwnProperty(m)) {
        if (this.state.images[m] !== "") {
          formData.append("images[" + m + "]", this.state.images[m]);
        }
      }
    }

    for (var f in this.state.graphics) {
      if (this.state.graphics.hasOwnProperty(f)) {
        if (this.state.graphics[f] !== "") {
          formData.append("graphics[" + f + "]", this.state.graphics[f]);
        }
      }
    }

    for (var g in this.state.videos) {
      if (this.state.videos.hasOwnProperty(g)) {
        if (this.state.videos[g] !== "") {
          formData.append("videos[" + g + "]", this.state.videos[g]);
        }
      }
    }

    return formData;
  };

  /**
   * @description : Callback for touching add button
   *
   * @author Ali Aryani
   *
   */
  handleEditNews = event => {
    if (event !== undefined) {
      event.preventDefault();
    }

    this.setState({ busy: true });

    ItookApi.editNews(this.props.routeParams.id, this.createFormData()).then(
      res => {
        console.log("res", res);
        // console.log("this.state.openedCategory", this.state.openedCategory.id);

        if (res && res.status && res.status === 200) {
          // this.state.data.unshift({ ...this.state.user });

          this.setState({
            busy: false,
            // data: res.data,
            // openedCategory: null,
            snackbarMessage: "عملیات با موفقیت انجام شد",
            isSnackOpen: true,
            openModal: false

            // errors: this.DEFAULT_STATE.errors
          });
          this.load();
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
   * @description : Callback for file of file browsing
   *
   * @author Ali Aryani
   *
   * @param event (object) : An event with file data
   *
   */
  handleVideoChange = e => {
    console.log("file", e.target.files[0]);
    // if (e.target.files[0]) {
    //   if (
    //     process.env.REACT_APP_MAX_JAVAZ_UPLOAD_SIZE_IN_BYTE >
    //     e.target.files[0].size
    //   ) {
    //     if (
    //       ["jpg", "jpeg", "png"].indexOf(
    //         e.target.files[0].name.split(".").pop()
    //       ) !== -1
    //     ) {

    if (e.target.files[0]) {
      if (
        ["mp4", "3gp", "ogg", "wmv", "wma"].indexOf(
          e.target.files[0].name.split(".").pop()
        ) !== -1
      ) {
        const videos = Array.from(e.target.files);
        this.setState(
          {
            videos: [...this.state.videos, ...videos],
            // localImages: [...this.state.localImages, ...localImages]
            localVideos: {
              ...this.state.localVideos,
              videos: [...this.state.localVideos.videos, ...videos]
            }
          },
          () => console.log("videos", this.state.localVideos.videos)
        );
      } else {
        setTimeout(() => {
          this.setState({
            isSnackOpen: true,
            snackbarMessage: "نوع فایل انتخابی معتبر نمی‌باشد"
            // fileMeli: null,
            // user: {
            //   ...this.state.user,
            //   fileMeli: ""
            // }
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
  handleGraphicChange = e => {
    console.log("file", e.target.files[0]);
    // if (e.target.files[0]) {
    //   if (
    //     process.env.REACT_APP_MAX_JAVAZ_UPLOAD_SIZE_IN_BYTE >
    //     e.target.files[0].size
    //   ) {
    //     if (
    //       ["jpg", "jpeg", "png"].indexOf(
    //         e.target.files[0].name.split(".").pop()
    //       ) !== -1
    //     ) {

    if (e.target.files[0]) {
      if (
        ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"].indexOf(
          e.target.files[0].name.split(".").pop()
        ) !== -1
      ) {
        const graphics = Array.from(e.target.files);
        this.setState(
          {
            graphics: [...this.state.graphics, ...graphics],
            // localImages: [...this.state.localImages, ...localImages]
            localGraphics: {
              ...this.state.localGraphics,
              graphics: [...this.state.localGraphics.graphics, ...graphics]
            }
          },
          () => console.log("graphics", this.state.localGraphics.graphics)
        );
      } else {
        setTimeout(() => {
          this.setState({
            isSnackOpen: true,
            snackbarMessage: "نوع فایل انتخابی معتبر نمی‌باشد"
            // fileMeli: null,
            // user: {
            //   ...this.state.user,
            //   fileMeli: ""
            // }
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
  handleGalleryPictureChange = e => {
    if (e.target.files[0]) {
      if (
        ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"].indexOf(
          e.target.files[0].name.split(".").pop()
        ) !== -1
      ) {
        const images = Array.from(e.target.files);
        const localImages = Array.from(e.target.files);

        console.log("galleryImages", images);

        this.setState(
          {
            images: [...this.state.images, ...images],
            // localImages: [...this.state.localImages, ...localImages]
            localImages: {
              ...this.state.localImages,
              images: [...this.state.localImages.images, ...images]
            }
          },
          () => console.log("images", this.state.localImages)
        );
        // const len = images.length;
        // for (let i = 0; i < len; i++)
        // this.setState(
        //   {
        //     newsData: {
        //       ...this.state.newsData,
        //       images: [...this.state.newsData.images, ...images]
        //     }
        //   },
        //   () => console.log("galleryImages", this.state.newsData.images)
        // );
      } else {
        setTimeout(() => {
          this.setState({
            isSnackOpen: true,
            snackbarMessage: "نوع فایل انتخابی معتبر نمی‌باشد"
            // fileMeli: null,
            // user: {
            //   ...this.state.user,
            //   fileMeli: ""
            // }
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
            newsData: {
              ...this.state.newsData,
              testImage: URL.createObjectURL(e.target.files[0])
            }
            // categoryName: {
            //   ...this.state.categoryName,
            //   image: URL.createObjectURL(e.target.files[0])
            // }
          },
          () => console.log("image", this.state.newsImage)
        );
      } else {
        setTimeout(() => {
          this.setState({
            isSnackOpen: true,
            snackbarMessage: "نوع فایل انتخابی معتبر نمی‌باشد"
            // fileMeli: null,
            // user: {
            //   ...this.state.user,
            //   fileMeli: ""
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
            newsImage: "",
            newsData: {
              ...this.state.newsData,
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

        newsData: { ...this.state.newsData, [key]: data }
      },
      console.log("newsData", this.state.newsData)
    );
  };

  handleChangeAgeCheckbox = event => {
    console.log("event", event.target.checked);
    this.setState(
      {
        newsData: {
          ...this.state.newsData,
          homePage: event.target.checked === true ? 1 : 0
        }
      },
      () => console.log("news", this.state.news)
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

        newsData: { ...this.state.newsData, body: data }
      },
      () => console.log("newsData", this.state.newsData)
    );
  };

  handleRemoveVideos = index => {
    console.log("index", index);
    var videos = this.state.newsData.videos;
    videos.splice(index, 1);

    var deleteVideos = this.state.deleteVideos.map(n => {
      return n;
    });

    deleteVideos.push(index);

    this.setState(
      {
        newsData: {
          ...this.state.newsData,
          videos
        },
        deleteVideos
      },
      () => console.log("deleteVideos", this.state.deleteVideos)
    );
  };

  handleRemoveLocalVideos = index => {
    console.log("index", index);
    var localVideos = this.state.localVideos.videos;

    var videos = this.state.videos;

    videos.splice(index, 1);

    localVideos.splice(index, 1);
    this.setState(
      {
        localVideos: {
          ...this.state.localVideos,
          videos: localVideos
        },
        videos
      },
      () => console.log("localVideos", this.state.localVideos)
    );
  };

  handleRemoveLoacalImage = index => {
    console.log("index", index);
    var localImages = this.state.localImages.images;

    var images = this.state.images;

    images.splice(index, 1);

    localImages.splice(index, 1);
    this.setState(
      {
        localImages: {
          ...this.state.localImages,
          images: localImages
        },
        images
      },
      () => console.log("images", this.state.localImages)
    );
  };

  handleRemoveLoacalGraphics = index => {
    console.log("index", index);
    var localGraphics = this.state.localGraphics.graphics;

    var graphics = this.state.graphics;

    graphics.splice(index, 1);

    localGraphics.splice(index, 1);
    this.setState(
      {
        localGraphics: {
          ...this.state.localGraphics,
          graphics: localGraphics
        },
        graphics
      },
      () => console.log("graphics", this.state.localGraphics)
    );
  };

  handleAddNewTag = () => {
    var tagList = this.state.tagList.tagList;

    if (this.state.newTag.length > 0) {
      tagList.push(this.state.newTag);

      this.setState(
        {
          tagList: {
            ...this.state.tagList,
            tagList
          },
          newTag: ""
        },
        () => {
          console.log("tagList", this.state.tagList);
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

    var data = this.state.FilterTags;
    console.log("this.state.FilterTags", this.state.FilterTags);

    var tagList = this.state.tagList.tagList;
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        tagList.push(data[i].name);
        console.log("data[i].name", data[i].name);
        break;
      }
    }
    this.setState(
      {
        tagList: {
          ...this.state.tagList,
          tagList
        },
        newTag: "",
        FilterTags: undefined
      },
      () => {
        console.log("tag", this.state.tagList);
      }
    );
  };

  handleDeleteChip = index => {
    console.log("index", index);
    var tagList = this.state.tagList.tagList;
    tagList.splice(index, 1);
    // for(var i=0; i<galleryImages.length;i++)
    // {
    //   if(galleryImages[i]===index)
    //   {

    //   }
    // }

    this.setState(
      {
        tagList: {
          ...this.state.tagList,
          tagList
        }
      },
      () => console.log("tag", this.state.tagList)
    );
  };

  handleRemoveImage = index => {
    console.log("index", index);
    var images = this.state.newsData.images;
    images.splice(index, 1);

    var deleteImages = this.state.deleteImages.map(n => {
      return n;
    });

    deleteImages.push(index);

    this.setState(
      {
        newsData: {
          ...this.state.newsData,
          images
        },
        deleteImages
      },
      () => console.log("deleteImages", this.state.deleteImages)
    );
  };

  handleRemoveGraphics = index => {
    console.log("index", index);
    var graphics = this.state.newsData.graphics;
    graphics.splice(index, 1);

    var deleteGraphics = this.state.deleteGraphics.map(n => {
      return n;
    });

    deleteGraphics.push(index);

    this.setState(
      {
        newsData: {
          ...this.state.newsData,
          graphics
        },
        deleteGraphics
      },
      () => console.log("deleteGraphics", this.state.deleteGraphics)
    );
  };

  handleChangeSelectFieldData = (key, event) => {
    console.log("news", event);
    this.setState(
      {
        newsData: {
          ...this.state.newsData,
          [key]: event
        },
        errors: { ...this.state.errors, [key]: "" }
      },
      () => console.log("newsData", this.state.newsData)
    );
  };

  handlePublish = () => {
    console.log("res");
    this.setState({ publishing: true });

    ItookApi.newsPublish(this.props.routeParams.id).then(
      res => {
        // this.setState({ isLoading: false });
        console.log("res");
        if (res && res.status && res.status === 200 && res.data) {
          console.log("res", res);
          this.load();
          this.setState({
            publishing: false,
            isSnackOpen: true,
            snackbarMessage: "عملیات با موفقیت انجام شد"
          });
        } else {
          console.log("res", res);
          this.setState({
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
      this.state.isLoading ||
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
      console.log("images", this.state.tagList);
      component = (
        <EditNewsUI
          busy={this.state.busy}
          publishing={this.state.publishing}
          errors={this.state.errors}
          postType={this.state.postType}
          categories={this.state.categories}
          khabarnegar={this.state.khabarnegar}
          virastar={this.state.virastar}
          publisher={this.state.publisher}
          postCreatType={this.state.postCreatType}
          groups={this.state.groups}
          onChangeAgeCheckbox={this.handleChangeAgeCheckbox}
          newsData={this.state.newsData}
          onChangeTextFieldData={this.handleChangeTextFieldData}
          onChangeSelectFieldData={this.handleChangeSelectFieldData}
          OnPictureChange={this.handlePictureChange}
          onVideoChange={this.handleVideoChange}
          onGraphicChange={this.handleGraphicChange}
          onEditNews={this.handleEditNews}
          onChangeEditor={this.handleChangeEditor}
          OnGalleryPictureChange={this.handleGalleryPictureChange}
          onRemoveImage={this.handleRemoveImage}
          onRemoveLoacalImage={this.handleRemoveLoacalImage}
          onRemoveGraphic={this.handleRemoveGraphics}
          onRemoveLoacalGraphic={this.handleRemoveLoacalGraphics}
          onRemoveVideos={this.handleRemoveVideos}
          onRemoveLocalVideos={this.handleRemoveLocalVideos}
          localImages={this.state.localImages}
          localVideos={this.state.localVideos}
          localGraphics={this.state.localGraphics}
          onPublish={this.handlePublish}
          SuggestSearch={this.handleSuggestFildeSearch}
          OnClicTag={this.handleClicTag}
          FilterTags={this.state.FilterTags}
          onAddNewTag={this.handleAddNewTag}
          tags={this.state.tags}
          newTag={this.state.newTag}
          tagList={this.state.tagList}
          onDeleteChip={this.handleDeleteChip}
        />
      );
    }

    return (
      <Fragment>
        <AppLayout title="ویرایش خبر">
          <Grid>
            {component}
            {this.renderHelperComponents()}
          </Grid>
        </AppLayout>
      </Fragment>
    );
  }
}

export default connect()(EditNews);
