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
      isLoadingVirastar: true,
      isLoadingPublisher: true,
      isLoadingPostCreatType: true,
      newsData: undefined,
      images: [],
      videos: [],

      localImages: { images: [] },
      localVideos: { videos: [] },

      deleteImages: [],
      deleteVideos: [],

      newsImage: null,
      errors: {
        categoryId: "", //dastebandi
        editorId: "", //virastar
        postsCreateTypeId: "", //shiveye tolid
        postsTypeId: "", //noe khabar
        publisherId: "", //montasher konande
        userId: "", // khabarnegar,
        lead: "", //lead
        title: "", //titr khabr
        preTitle: "", //roo titir
        postTitle: "", //zire titr
        defaultImage: null,
        body: ""
      },
      busy: false,
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
          this.setState({
            newsData: res.data,
            // filteredData: transactions,
            // filteredData: this.filterData(res.data.match, "CUSTOMER"),
            isLoading: false
          });

          this.fetchPostType();
          this.fetchCategories();
          this.fetchKhabarNegar();
          this.fetchVirastar();
          this.fetchPublisher();
          this.fetchPostCreateType();
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

  fetchVirastar = () => {
    console.log("res");
    ItookApi.fetchVirastar().then(
      res => {
        // this.setState({ isLoading: false });
        console.log("res", res);
        if (res && res.status && res.status === 200 && res.data.users) {
          console.log("res", res);

          this.setState({
            virastar: res.data.users,
            isLoadingVirastar: false
          });
        } else {
          this.setState({ virastar: undefined, isLoadingVirastar: false });
        }
      },
      err => {
        this.setState({});
        process.env.NODE_ENV === "development" ? console.log(err) : void 0;
      }
    );
  };

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

    formData.append("categoryId", this.state.newsData.categoryId);
    formData.append("editorId", this.state.newsData.editorId);
    formData.append("postsCreateTypeId", this.state.newsData.postsCreateTypeId);
    formData.append("postsTypeId", this.state.newsData.postsTypeId);
    formData.append("publisherId", this.state.newsData.publisherId);
    formData.append("userId", this.state.newsData.userId);
    formData.append("lead", this.state.newsData.lead);
    formData.append("title", this.state.newsData.title);
    formData.append("preTitle", this.state.newsData.preTitle);
    formData.append("postTitle", this.state.newsData.postTitle);
    formData.append("testImage", this.state.newsImage);
    formData.append("body", this.state.newsData.body);
    formData.append("deleteImages", this.state.deleteImages);
    formData.append("deletevideos", this.state.deletevideos);

    for (var k in this.state.images) {
      if (this.state.images.hasOwnProperty(k)) {
        if (this.state.images[k] !== "") {
          formData.append("images[" + k + "]", this.state.images[k]);
        }
      }
    }

    for (var i in this.state.videos) {
      if (this.state.videos.hasOwnProperty(i)) {
        if (this.state.videos[i] !== "") {
          formData.append("videos[" + i + "]", this.state.videos[i]);
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
          this.load();
          this.setState({
            busy: false,
            // data: res.data,
            // openedCategory: null,
            snackbarMessage: "عملیات با موفقیت انجام شد",
            isSnackOpen: true,
            openModal: false

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
      () => console.log("videos", this.state.news.videos)
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
      if (e.target.files[0].size <= 124000000) {
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
              snackbarMessage: "نوع فایل انتخابی معتبر نمی‌باشد",
              // fileMeli: null,
              // user: {
              //   ...this.state.user,
              //   fileMeli: ""
              // }
              newsImage: "",
              newsData: {
                ...this.state.newsData,
                newsData: null
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
              newsData: {
                ...this.state.newsData,
                defaultImage: null
              },
              isSnackOpen: true,
              snackbarMessage: "حجم عکس انتخابی بیشتر از 120 کیلوبایت می‌باشد"
            },
            () => console.log("snack", this.state.isSnackOpen)
          );
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
      if (e.target.files[0].size <= 124000000) {
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
              snackbarMessage: "نوع فایل انتخابی معتبر نمی‌باشد",
              // fileMeli: null,
              // user: {
              //   ...this.state.user,
              //   fileMeli: ""
              // }
              newsImage: "",
              newsData: {
                ...this.state.newsData,
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
      () => console.log("images", this.state.localImages)
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
      this.state.isLoadingPublisher ||
      this.state.isLoadingVirastar
    ) {
      component = (
        <div style={{ marginTop: "15%" }}>
          <Loading />
        </div>
      );
    } else {
      console.log("images", this.state.localImages);
      component = (
        <EditNewsUI
          busy={this.state.busy}
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
          onEditNews={this.handleEditNews}
          onChangeEditor={this.handleChangeEditor}
          OnGalleryPictureChange={this.handleGalleryPictureChange}
          onRemoveImage={this.handleRemoveImage}
          onRemoveLoacalImage={this.handleRemoveLoacalImage}
          onRemoveVideos={this.handleRemoveVideos}
          onRemoveLocalVideos={this.handleRemoveLocalVideos}
          localImages={this.state.localImages}
          localVideos={this.state.localVideos}
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
