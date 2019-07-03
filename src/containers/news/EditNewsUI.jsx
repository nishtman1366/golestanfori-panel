import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { Editor } from "@tinymce/tinymce-react";
import Checkbox from "@material-ui/core/Checkbox";

import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Remove, AddMedia, Tik, Publish } from "components/Icons";
import { connect } from "react-redux";
import jMoment from "moment-jalaali";

import FormHelperText from "@material-ui/core/FormHelperText";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import ReactPlayer from "react-player";

const styles = theme => ({
  root: {
    overflowX: "auto",
    padding: 16
  },

  formControl: {
    // margin: theme.spacing.unit,
    marginTop: 8,
    minWidth: 120,
    right: 0,
    left: "auto"
  },
  colorSwitchBase: {
    color: "#2196f3",

    "&$colorChecked": {
      color: "#2196f3",
      "& + $colorBar": {
        backgroundColor: "#2196f3"
      }
    }
  },
  bar: {},

  formControlLable: {
    direction: "ltr",
    left: 16,
    top: "0",
    right: "auto",
    position: "absolute"
  },
  textFieldFormLabel: {
    textAlign: "right",
    right: "0",
    direction: "ltr",
    left: "auto",
    fontFamily: "iransans",
    fontSize: ".9rem"
  },
  textFieldForm: {
    fontFamily: "iransans",
    fontSize: ".9rem"
  },
  dialogPaper: {
    maxHeight: "500px",
    width: "700px"
  }
});
class EditNewsUI extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      page: 0,
      rowsPerPage: 10,
      checkedA: true,
      checkedB: true
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
    console.log("images", this.props.localImages);
    return (
      <div>
        {this.props.newsData !== undefined ? this.renderFormHeader() : void 0}
      </div>
    );
  }

  renderFormHeader = () => {
    console.log("formats", this.props.newsData);
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={classes.root} justify="center" spacing={2}>
          <Grid item xs={12}>
            <Button
              disabled={
                this.props.user.permissions["view-comments-list"] === false
              }
              href={"editNews/" + this.props.newsData.id + "/comments"}
              variant="outlined"
              color="primary"
              className={classes.button}
            >
              مشاهده نظرات
            </Button>
          </Grid>
          <Grid item xs={7}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>اطلاعات خبر</p>
            <Paper className={classes.root}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={6} md={3}>
                  <FormControl
                    className={classes.formControl}
                    error={this.props.errors.postsTypeId}
                  >
                    <InputLabel
                      htmlFor="type"
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                      }}
                    >
                      نوع{" "}
                    </InputLabel>
                    <Select
                      readOnly
                      value={this.props.newsData.postsTypeId}
                      onChange={e => {
                        this.props.onChangeSelectFieldData(
                          "postsTypeId",
                          e.target.value
                        );
                      }}
                      input={<Input id="name-error" />}
                    >
                      {this.props.postType
                        ? this.props.postType.map(n => {
                            return (
                              <MenuItem
                                value={n.id}
                                key={n.id}
                                style={{
                                  fontFamily: "iransans",
                                  fontSize: ".9rem",
                                  right: 0,
                                  left: "auto"
                                }}
                              >
                                {n.name}
                              </MenuItem>
                            );
                          })
                        : void 0}
                    </Select>
                    <FormHelperText>
                      {this.props.errors.postsTypeId}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl
                    className={classes.formControl}
                    error={this.props.errors.categoryId}
                  >
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
                      readOnly={
                        this.props.user.permissions["edit-news"] === false
                      }
                      value={this.props.newsData.categoryId}
                      onChange={e => {
                        this.props.onChangeSelectFieldData(
                          "categoryId",
                          e.target.value
                        );
                      }}
                      input={<Input id="type" />}
                    >
                      {this.renderCategories(this.props.categories)}
                    </Select>
                    <FormHelperText>
                      {this.props.errors.categoryId}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl
                    className={classes.formControl}
                    error={this.props.errors.postsCreateTypeId}
                  >
                    <InputLabel
                      htmlFor="type"
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                      }}
                    >
                      شیوه تولید
                    </InputLabel>
                    <Select
                      readOnly={
                        this.props.user.permissions["edit-news"] === false
                      }
                      value={this.props.newsData.postsCreateTypeId}
                      onChange={e => {
                        this.props.onChangeSelectFieldData(
                          "postsCreateTypeId",
                          e.target.value
                        );
                      }}
                      input={<Input id="name-error" />}
                    >
                      {this.props.postCreatType
                        ? this.props.postCreatType.map(n => {
                            return (
                              <MenuItem
                                value={n.id}
                                key={n.id}
                                style={{
                                  fontFamily: "iransans",
                                  fontSize: ".9rem",
                                  right: 0,
                                  left: "auto"
                                }}
                              >
                                {n.name}
                              </MenuItem>
                            );
                          })
                        : void 0}
                    </Select>
                    <FormHelperText>
                      {this.props.errors.postsCreateTypeId}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    error={this.props.errors.code}
                    helperText={this.props.errors.code}
                    required
                    disabled
                    // id="required"
                    type="text"
                    label="کد خبر"
                    value={this.props.newsData.code}
                    onChange={e => {
                      this.props.onChangeTextFieldData("code", e.target.value);
                    }}
                    InputLabelProps={{
                      className: classes.textFieldFormLabel
                    }}
                    InputProps={{
                      className: classes.textFieldForm
                    }}
                    margin="normal"
                    style={{ width: "100%", marginTop: 9 }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={5}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>
              اطلاعات افراد
            </p>
            <Paper className={classes.root}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={6} md={4}>
                  <FormControl
                    className={classes.formControl}
                    error={this.props.errors.userId}
                  >
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
                      readOnly={
                        this.props.user.permissions["edit-news"] === false
                      }
                      value={this.props.newsData.userId}
                      onChange={e => {
                        this.props.onChangeSelectFieldData(
                          "userId",
                          e.target.value
                        );
                      }}
                      input={<Input id="name-error" />}
                    >
                      {this.props.khabarnegar
                        ? this.props.khabarnegar.map(n => {
                            return (
                              <MenuItem
                                value={n.id}
                                key={n.id}
                                style={{
                                  fontFamily: "iransans",
                                  fontSize: ".9rem",
                                  right: 0,
                                  left: "auto"
                                }}
                              >
                                {n.name}
                              </MenuItem>
                            );
                          })
                        : void 0}
                    </Select>
                    <FormHelperText>{this.props.errors.userId}</FormHelperText>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={6} md={3}>
                  <FormControl
                    className={classes.formControl}
                    error={this.props.errors.editorId}
                  >
                    <InputLabel
                      htmlFor="type"
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                      }}
                    >
                      ویراستار
                    </InputLabel>
                    <Select
                      value={this.props.newsData.editorId}
                      onChange={e => {
                        this.props.onChangeSelectFieldData(
                          "editorId",
                          e.target.value
                        );
                      }}
                      input={<Input id="name-error" />}
                    >
                      {this.props.virastar
                        ? this.props.virastar.map(n => {
                            return (
                              <MenuItem
                                value={n.id}
                                key={n.id}
                                style={{
                                  fontFamily: "iransans",
                                  fontSize: ".9rem",
                                  right: 0,
                                  left: "auto"
                                }}
                              >
                                {n.name}
                              </MenuItem>
                            );
                          })
                        : void 0}
                    </Select>
                    <FormHelperText>
                      {this.props.errors.editorId}
                    </FormHelperText>
                  </FormControl>
                </Grid> */}
                <Grid item xs={6} md={4}>
                  <FormControl
                    className={classes.formControl}
                    error={this.props.errors.publisherId}
                  >
                    <InputLabel
                      htmlFor="type"
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                      }}
                    >
                      منتشرکننده
                    </InputLabel>
                    <Select
                      readOnly={
                        this.props.user.permissions["edit-news"] === false
                      }
                      value={this.props.newsData.publisherId}
                      onChange={e => {
                        this.props.onChangeSelectFieldData(
                          "publisherId",
                          e.target.value
                        );
                      }}
                      input={<Input id="name-error" />}
                    >
                      {this.props.publisher
                        ? this.props.publisher.map(n => {
                            return (
                              <MenuItem
                                value={n.id}
                                key={n.id}
                                style={{
                                  fontFamily: "iransans",
                                  fontSize: ".9rem",
                                  right: 0,
                                  left: "auto"
                                }}
                              >
                                {n.name}
                              </MenuItem>
                            );
                          })
                        : void 0}
                    </Select>
                    <FormHelperText>
                      {this.props.errors.publisherId}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField
                    disabled={
                      this.props.user.permissions["edit-news"] === false
                    }
                    error={this.props.errors.photographer}
                    helperText={this.props.errors.photographer}
                    required
                    // id="required"
                    type="text"
                    label="عکاس"
                    value={this.props.newsData.photographer}
                    onChange={e => {
                      this.props.onChangeTextFieldData(
                        "photographer",
                        e.target.value
                      );
                    }}
                    InputLabelProps={{
                      className: classes.textFieldFormLabel
                    }}
                    InputProps={{
                      className: classes.textFieldForm
                    }}
                    margin="normal"
                    style={{ width: "100%", marginTop: 9 }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>جزئیات خبر</p>
            <Paper className={classes.root}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    disabled={
                      this.props.user.permissions["edit-news"] === false
                    }
                    error={this.props.errors.preTitle}
                    helperText={this.props.errors.preTitle}
                    required
                    autoFocus={true}
                    // id="required"
                    type="text"
                    label="روتیتر"
                    multiline
                    style={{ width: "100%" }}
                    value={this.props.newsData.preTitle}
                    onChange={e => {
                      this.props.onChangeTextFieldData(
                        "preTitle",
                        e.target.value
                      );
                    }}
                    InputLabelProps={{
                      className: classes.textFieldFormLabel
                    }}
                    InputProps={{
                      className: classes.textFieldForm
                    }}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    error={this.props.errors.title}
                    helperText={this.props.errors.title}
                    required
                    disabled={
                      this.props.user.permissions["edit-news"] === false
                    }
                    type="text"
                    label="تیتر"
                    multiline
                    value={this.props.newsData.title}
                    onChange={e => {
                      this.props.onChangeTextFieldData("title", e.target.value);
                    }}
                    InputLabelProps={{
                      className: classes.textFieldFormLabel
                    }}
                    InputProps={{
                      className: classes.textFieldForm
                    }}
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    error={this.props.errors.postTitle}
                    helperText={this.props.errors.postTitle}
                    required
                    disabled={
                      this.props.user.permissions["edit-news"] === false
                    }
                    type="text"
                    label="زیر تیتر"
                    multiline
                    value={this.props.newsData.postTitle}
                    onChange={e => {
                      this.props.onChangeTextFieldData(
                        "postTitle",
                        e.target.value
                      );
                    }}
                    InputLabelProps={{
                      className: classes.textFieldFormLabel
                    }}
                    InputProps={{
                      className: classes.textFieldForm
                    }}
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                </Grid>

                <Grid item xs={8}>
                  <TextField
                    error={this.props.errors.lead}
                    helperText={this.props.errors.lead}
                    required
                    disabled={
                      this.props.user.permissions["edit-news"] === false
                    }
                    type="text"
                    label="لید"
                    multiline
                    value={this.props.newsData.lead}
                    onChange={e => {
                      this.props.onChangeTextFieldData("lead", e.target.value);
                    }}
                    InputLabelProps={{
                      className: classes.textFieldFormLabel
                    }}
                    InputProps={{
                      className: classes.textFieldForm
                    }}
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    error={this.props.errors.source}
                    helperText={this.props.errors.source}
                    required
                    disabled={
                      this.props.user.permissions["edit-news"] === false
                    }
                    type="text"
                    label="منبع"
                    multiline
                    value={this.props.newsData.source}
                    onChange={e => {
                      this.props.onChangeTextFieldData(
                        "source",
                        e.target.value
                      );
                    }}
                    InputLabelProps={{
                      className: classes.textFieldFormLabel
                    }}
                    InputProps={{
                      className: classes.textFieldForm
                    }}
                    margin="normal"
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>عکس اصلی</p>
            <input
              disabled={this.props.user.permissions["edit-news"] === false}
              style={{ display: "none" }}
              ref="image"
              accept=".png,.jpg,.jpeg"
              className={classes.input}
              id="raised-pic1-file"
              multiple
              type="file"
              onChange={event => {
                this.props.OnPictureChange(event);
                this.refs.image.value = "";
              }}
            />
            {this.props.newsData.testImage ? (
              <div>
                <label htmlFor="raised-pic1-file">
                  <Card
                    style={{
                      width: 250,
                      height: 200,
                      position: "relative",
                      background: "#000"
                    }}
                  >
                    {/* <CardMedia
                      image={this.props.newsData.testImage}
                      style={{
                        position: "relative",
                        margin: "auto",
                        width: 250,
                        height: 200,
                        cursor: "pointer"
                      }}
                    /> */}

                    <img
                      src={this.props.newsData.testImage}
                      alt=""
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        position: "absolute",
                        margin: "auto",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0
                      }}
                    />
                  </Card>
                </label>
              </div>
            ) : (
              <div>
                <label htmlFor="raised-pic1-file">
                  <Card style={{ width: 250, height: 200 }}>
                    <CardMedia
                      alt="تصویر اصلی"
                      image="/images/empty.png"
                      style={{
                        position: "relative",
                        margin: "auto",
                        width: 250,
                        height: 200,
                        cursor: "pointer",
                        textAlign: "center"
                      }}
                    />
                  </Card>
                </label>
              </div>
            )}
          </Grid>
          <Grid item xs={9}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>متن خبر</p>
            <Editor
              disabled={this.props.user.permissions["edit-news"] === false}
              apiKey="YOUR_API_KEY"
              init={{
                plugins:
                  "print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount tinymcespellchecker a11ychecker imagetools textpattern help formatpainter permanentpen pageembed tinycomments mentions linkchecker",
                language: "fa_IR",
                language_url: "/assets/tinymce/langs/fa_IR.js",
                toolbar:
                  "formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image media pageembed | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment|ltr rtl",
                image_advtab: true,
                content_css: [
                  "//fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
                  "//www.tiny.cloud/css/codepen.min.css"
                ],
                link_list: [
                  {
                    title: "My page 1",
                    value: "http://www.tinymce.com"
                  },
                  {
                    title: "My page 2",
                    value: "http://www.moxiecode.com"
                  }
                ],
                image_list: [
                  {
                    title: "My page 1",
                    value: "http://www.tinymce.com"
                  },
                  {
                    title: "My page 2",
                    value: "http://www.moxiecode.com"
                  }
                ],
                image_class_list: [
                  { title: "None", value: "" },
                  { title: "Some class", value: "class-name" }
                ],
                // importcss_append: true,
                height: 350,
                file_picker_callback: function(callback, value, meta) {
                  /* Provide file and text for the link dialog */
                  if (meta.filetype === "file") {
                    callback("https://www.google.com/logos/google.jpg", {
                      text: "My text"
                    });
                  }

                  /* Provide image and alt text for the image dialog */
                  if (meta.filetype === "image") {
                    callback("https://www.google.com/logos/google.jpg", {
                      alt: "My alt text"
                    });
                  }

                  /* Provide alternative source and posted for the media dialog */
                  if (meta.filetype === "media") {
                    callback("movie.mp4", {
                      source2: "alt.ogg",
                      poster: "https://www.google.com/logos/google.jpg"
                    });
                  }
                },
                templates: [
                  {
                    title: "Some title 1",
                    description: "Some desc 1",
                    content: "My content"
                  },
                  {
                    title: "Some title 2",
                    description: "Some desc 2",
                    content:
                      '<div class="mceTmpl"><span class="cdate">cdate</span><span class="mdate">mdate</span>My content2</div>'
                  }
                ],
                template_cdate_format: "[CDATE: %m/%d/%Y : %H:%M:%S]",
                template_mdate_format: "[MDATE: %m/%d/%Y : %H:%M:%S]",
                image_caption: true,
                spellchecker_dialog: true,
                spellchecker_whitelist: ["Ephox", "Moxiecode"],
                tinycomments_mode: "embedded",
                content_style:
                  ".mce-annotation { background: #fff0b7; } .tc-active-annotation {background: #ffe168; color: black; }",
                images_upload_url: "http://192.168.1.6:8000/upload"
              }}
              initialValue={this.props.newsData.body}
              // onChange={e => {
              //   this.props.onChangeEditor(e.target.getContent());
              // }}
              onChange={e => {
                this.props.onChangeEditor(e.target.getContent());
              }}
            />
          </Grid>
          {console.log("postsTypeId", this.props.newsData)}

          {this.props.newsData.postsTypeId === 5 ? (
            <Grid item xs={12}>
              <p style={{ fontWeight: "bold", color: "#2196F3" }}>
                انتخاب عکس ها
              </p>
              <Paper className={classes.root}>
                <input
                  disabled={this.props.user.permissions["edit-news"] === false}
                  style={{ display: "none" }}
                  ref="galleryImages"
                  accept=".png,.jpg,.jpeg"
                  className={classes.input}
                  id="raised-galleryImages-file"
                  multiple
                  type="file"
                  onChange={event => {
                    this.props.OnGalleryPictureChange(event);
                    this.refs.galleryImages.value = "";
                  }}
                />

                <div>
                  {/* <label htmlFor="raised-galleryImages-file"> */}
                  <div>
                    <label htmlFor="raised-galleryImages-file">
                      <AddMedia
                        disabled={
                          this.props.user.permissions["edit-news"] === false
                        }
                      />
                    </label>
                  </div>

                  {/* </label> */}
                </div>
                {console.log("images", this.props.newsData.images)}
                <Grid container>
                  {this.props.newsData.images.length > 0
                    ? this.renderGalleryImages(this.props.newsData.images)
                    : void 0}
                  {console.log("images", this.props.localImages)}

                  {this.props.localImages
                    ? this.renderLocalGalleryImages(
                        this.props.localImages.images
                      )
                    : void 0}
                </Grid>
              </Paper>
            </Grid>
          ) : this.props.newsData.postsTypeId === 6 ? (
            <Grid item xs={12}>
              <p style={{ fontWeight: "bold", color: "#2196F3" }}>
                انتخاب فیلم ها
              </p>
              <Paper className={classes.root}>
                <input
                  ref="VideoUpload"
                  disabled={this.props.user.permissions["edit-news"] === false}
                  id="raised-VideoUpload-file"
                  multiple
                  type="file"
                  style={{ display: "none" }}
                  onChange={event => {
                    this.props.onVideoChange(event);
                    this.refs.VideoUpload.value = "";
                  }}
                />

                <div>
                  {/* <label htmlFor="raised-galleryImages-file"> */}
                  <div>
                    <label htmlFor="raised-VideoUpload-file">
                      <AddMedia
                        disabled={
                          this.props.user.permissions["edit-news"] === false
                        }
                      />
                    </label>
                  </div>

                  {/* </label> */}
                </div>
                {console.log("videos", this.props.newsData.videos)}
                <Grid container>
                  {this.props.newsData.videos.length > 0
                    ? this.renderGalleryVideos(this.props.newsData.videos)
                    : void 0}
                  {console.log("images", this.props.localVideos)}

                  {this.props.localVideos
                    ? this.renderLocalGalleryVideos(
                        this.props.localVideos.videos
                      )
                    : void 0}
                </Grid>
              </Paper>
            </Grid>
          ) : this.props.newsData.postsTypeId === 7 ? (
            <Grid item xs={12}>
              <p style={{ fontWeight: "bold", color: "#2196F3" }}>
                انتخاب گرافیک ها
              </p>
              <Paper className={classes.root}>
                <input
                  ref="GraphicUpload"
                  disabled={this.props.user.permissions["edit-news"] === false}
                  id="raised-GraphicUpload-file"
                  multiple
                  type="file"
                  style={{ display: "none" }}
                  onChange={event => {
                    this.props.onGraphicChange(event);
                    this.refs.GraphicUpload.value = "";
                  }}
                />

                <div>
                  {/* <label htmlFor="raised-galleryImages-file"> */}
                  <div>
                    <label htmlFor="raised-GraphicUpload-file">
                      <AddMedia
                        disabled={
                          this.props.user.permissions["edit-news"] === false
                        }
                      />
                    </label>
                  </div>

                  {/* </label> */}
                </div>
                {console.log("videos", this.props.newsData.graphics)}
                <Grid container>
                  {this.props.newsData.graphics.length > 0
                    ? this.renderGalleryGraphic(this.props.newsData.graphics)
                    : void 0}
                  {console.log("images", this.props.localGraphics)}

                  {this.props.localGraphics
                    ? this.renderLocalGalleryGraphic(
                        this.props.localGraphics.graphics
                      )
                    : void 0}
                </Grid>
              </Paper>
            </Grid>
          ) : (
            void 0
          )}

          <Grid item xs={12}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>تنظیمات خبر</p>
            <Paper className={classes.root}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={6} md={3}>
                  <FormControl
                    className={classes.formControl}
                    error={this.props.errors.groups}
                  >
                    <InputLabel
                      htmlFor="type"
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                      }}
                    >
                      گروه خبر
                    </InputLabel>
                    <Select
                      readOnly={
                        this.props.user.permissions["edit-news"] === false
                      }
                      value={this.props.newsData.groupId}
                      onChange={e => {
                        this.props.onChangeSelectFieldData(
                          "groupId",
                          e.target.value
                        );
                      }}
                      input={<Input id="name-error" />}
                    >
                      {this.props.groups
                        ? this.props.groups.map(n => {
                            return (
                              <MenuItem
                                value={n.id}
                                key={n.id}
                                style={{
                                  fontFamily: "iransans",
                                  fontSize: ".9rem",
                                  right: 0,
                                  left: "auto"
                                }}
                              >
                                {n.name}
                              </MenuItem>
                            );
                          })
                        : void 0}
                    </Select>
                    <FormHelperText>{this.props.errors.groupId}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      htmlFor="type"
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                      }}
                    >
                      جایگاه خبر
                    </InputLabel>
                    <Select
                      value={this.props.newsData.groupPosition}
                      readOnly={
                        this.props.user.permissions["edit-news"] === false
                      }
                      // formhelpertext={this.props.errorsProducts.unitType}
                      onChange={e => {
                        this.props.onChangeSelectFieldData(
                          "groupPosition",
                          e.target.value
                        );
                      }}
                      input={<Input id="type" />}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                  <FormHelperText>
                    {this.props.errors.groupPosition}
                  </FormHelperText>
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      htmlFor="type"
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                      }}
                    >
                      انتخاب قالب
                    </InputLabel>
                    <Select
                      value={this.props.newsData.template}
                      readOnly={
                        this.props.user.permissions["edit-news"] === false
                      }
                      // formhelpertext={this.props.errorsProducts.unitType}
                      onChange={e => {
                        this.props.onChangeSelectFieldData(
                          "template",
                          e.target.value
                        );
                      }}
                      input={<Input id="type" />}
                    >
                      <MenuItem
                        style={{
                          fontFamily: "iransans",
                          fontSize: ".9rem",
                          right: 0,
                          left: "auto"
                        }}
                        value={1}
                      >
                        قالب یک
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontFamily: "iransans",
                          fontSize: ".9rem",
                          right: 0,
                          left: "auto"
                        }}
                        value={2}
                      >
                        قالب دو
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormHelperText>{this.props.errors.template}</FormHelperText>
                </Grid>
                <Grid item xs={6} md={3}>
                  <div style={{ marginTop: 24 }}>
                    <FormControlLabel
                      style={{ direction: "rtl" }}
                      // label="نمایش در صفحه اول"
                      control={
                        <Checkbox
                          disabled={
                            this.props.user.permissions["edit-news"] === false
                          }
                          checked={this.props.newsData.homePage}
                          onChange={this.props.onChangeAgeCheckbox}
                          value={this.props.newsData.homePage}
                        />
                      }
                    />
                    <p
                      style={{
                        fontWeight: "bold",
                        display: "inline-Block",
                        fontSize: 12,
                        marginRight: 8
                      }}
                    >
                      نمایش در لیست آخرین اخبار
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {console.log("tagssss", this.props.newsData.tags)}
          <Grid item xs={12}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>برچسب ها</p>
            <Paper className={classes.root}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={6} md={4}>
                  <div style={{ display: "inline-block" }}>
                    <Button
                      disabled={
                        this.props.user.permissions["edit-news"] === false
                      }
                      onClick={this.props.onAddNewTag}
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem",
                        background: "#2196F3",
                        color: "#fff"
                      }}
                    >
                      افزودن
                    </Button>
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      verticalAlign: "bottom",
                      marginRight: 8
                    }}
                  >
                    <TextField
                      id="search"
                      label="جستجو"
                      type="search"
                      disabled={
                        this.props.user.permissions["edit-news"] === false
                      }
                      value={this.props.newTag}
                      className={classes.textField}
                      InputLabelProps={{
                        className: classes.textFieldFormLabel
                      }}
                      onChange={e => {
                        this.props.SuggestSearch(e.target.value);
                      }}
                      margin="normal"
                    />
                  </div>
                </Grid>
                <Grid item xs={8}>
                  {console.log("tags", this.props.tagList.tagList)}
                  <Grid container justify="center" spacing={2}>
                    {this.props.tagList && this.props.tagList.tagList.length > 0
                      ? this.renderTagsChip(this.props.tagList.tagList)
                      : void 0}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            {this.props.newTag !== "" ? (
              <div
                style={{
                  background: "#e3e3e3",
                  width: 260,

                  borderRadius: 8
                }}
              >
                {this.props.FilterTags.map(r => {
                  return (
                    <List
                      component="nav"
                      style={{
                        width: "100%",
                        maxWidth: "360px",
                        textAlign: "right"
                      }}
                      // className={classes.root}
                      aria-label="Mailbox folders"
                    >
                      <ListItem
                        style={{ textAlign: "right" }}
                        button
                        onClick={event => this.props.OnClicTag(event, r.id)}
                        key={r.id}
                      >
                        <ListItemText primary={r.name} />
                      </ListItem>
                      <Divider />
                    </List>
                  );
                })}
              </div>
            ) : (
              void 0
            )}
          </Grid>
          <Grid
            item
            xs={3}
            style={{
              textAlign: "center",
              marginBottom: 16,
              marginTop: 16
            }}
          >
            {this.props.busy ? (
              <CircularProgress size={30} />
            ) : this.props.user.permissions["edit-news"] === true ? (
              <Button
                disabled={this.props.busy}
                onClick={this.props.onEditNews}
                style={{
                  fontFamily: "iransans",
                  fontSize: ".9rem",
                  background: "#2196F3",
                  color: "#fff"
                }}
              >
                بروزرسانی
                <Tik style={{ marginRight: 8 }} />
              </Button>
            ) : (
              void 0
            )}
          </Grid>
          {this.props.user.permissions["publish-news"] === true ? (
            <Grid
              item
              xs={3}
              style={{
                textAlign: "center",
                marginBottom: 16,
                marginTop: 16
              }}
            >
              {this.props.publishing ? (
                <CircularProgress size={30} />
              ) : (
                <Button
                  disabled={this.props.publishing}
                  onClick={this.props.onPublish}
                  style={{
                    fontFamily: "iransans",
                    fontSize: ".9rem",
                    background: "#2196F3",
                    color: "#fff"
                  }}
                >
                  {this.props.newsData.status === 1 ? "لغو انتشار" : "انتشار"}

                  <Publish style={{ marginRight: 8 }} />
                </Button>
              )}
            </Grid>
          ) : (
            void 0
          )}
        </Grid>
      </div>
    );
  };

  renderTagsChip(tags) {
    console.log("tags", tags);
    var tag = [];
    const { classes } = this.props;
    for (let i = 0; i < tags.length; i++) {
      tag.push(
        <Grid item xs={6} md={3} key={tags[i]}>
          <Chip
            // icon={<Close onClick={this.props.onDeleteChip} />}
            style={{ padding: 12, cursor: "pointer" }}
            label={tags[i]}
            onDelete={
              this.props.user.permissions["edit-news"] === true
                ? () => this.props.onDeleteChip(i)
                : void 0
            }
            color="primary"
          />
        </Grid>
      );
    }
    return tag;
  }

  renderNameOfVideos(videos) {
    if (videos === undefined) return;

    var str = "";
    for (let i = 0; i < videos.length; i++) {
      str += videos[i].name + ",";
    }
    return str;
  }

  renderGalleryVideos(videos) {
    console.log("videos", videos);
    var galleryVideos = [];
    const { classes } = this.props;
    for (let i = 0; i < videos.length; i++) {
      galleryVideos.push(
        <Grid item xs={6} md={2} style={{ maxHeight: 250 }}>
          <Card className="video-container">
            {/* <CardMedia
              // alt="Adelle Charles"
              image={URL.createObjectURL(this.props.news.videos[i])}
              style={{
                position: "relative",
                margin: "auto",
                width: "100%",
                height: 90
              }}
            /> */}

            <ReactPlayer
              style={{ width: "100%", height: "100%" }}
              loop={true}
              pip={false}
              config={{
                file: { attributes: { controlsList: "nodownload" } }
              }}
              // style={{
              //   position: "relative",
              //   margin: "auto",
              //   width: "100%",
              //   height: 90
              // }}
              controls={true}
              url={this.props.newsData.videos[i]}
            />
            {this.props.user.permissions["edit-news"] === true ? (
              <div
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => this.props.onRemoveVideos(i)}
              >
                <Remove
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                />
                <p
                  style={{
                    display: "inline-block",
                    marginTop: 3,
                    fontWeight: "bold",
                    color: "#F44336",
                    verticalAlign: "middle",
                    marginRight: 4
                  }}
                >
                  حذف
                </p>{" "}
              </div>
            ) : (
              void 0
            )}
          </Card>
        </Grid>
      );
    }
    return galleryVideos;
  }
  renderLocalGalleryVideos(videos) {
    console.log("videos", videos);
    var galleryVideos = [];
    const { classes } = this.props;
    for (let i = 0; i < videos.length; i++) {
      galleryVideos.push(
        <Grid item xs={6} md={2} style={{ maxHeight: 250 }}>
          <Card className="video-container">
            {/* <CardMedia
              // alt="Adelle Charles"
              image={URL.createObjectURL(this.props.news.videos[i])}
              style={{
                position: "relative",
                margin: "auto",
                width: "100%",
                height: 90
              }}
            /> */}

            <ReactPlayer
              style={{ width: "100%", height: "100%" }}
              loop={true}
              pip={false}
              config={{
                file: { attributes: { controlsList: "nodownload" } }
              }}
              // style={{
              //   position: "relative",
              //   margin: "auto",
              //   width: "100%",
              //   height: 90
              // }}
              controls={true}
              url={URL.createObjectURL(this.props.localVideos.videos[i])}
            />
            {this.props.user.permissions["edit-news"] === true ? (
              <div
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => this.props.onRemoveLocalVideos(i)}
              >
                <Remove
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                />
                <p
                  style={{
                    display: "inline-block",
                    marginTop: 3,
                    fontWeight: "bold",
                    color: "#F44336",
                    verticalAlign: "middle",
                    marginRight: 4
                  }}
                >
                  حذف
                </p>{" "}
              </div>
            ) : (
              void 0
            )}
          </Card>
        </Grid>
      );
    }
    return galleryVideos;
  }

  renderGalleryImages(images) {
    console.log("images", images);
    var galleryImages = [];
    const { classes } = this.props;
    for (let i = 0; i < images.length; i++) {
      galleryImages.push(
        <Grid item xs={6} md={2}>
          <Card style={{ width: 130, height: 120, marginTop: 8 }}>
            <CardMedia
              // alt="Adelle Charles"
              image={this.props.newsData.images[i]}
              style={{
                position: "relative",
                margin: "auto",
                width: "100%",
                height: 90
              }}
            />
            {this.props.user.permissions["edit-news"] === true ? (
              <div
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => this.props.onRemoveImage(i)}
              >
                <Remove
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                />
                <p
                  style={{
                    display: "inline-block",
                    marginTop: 3,
                    fontWeight: "bold",
                    color: "#F44336",
                    verticalAlign: "middle",
                    marginRight: 4
                  }}
                >
                  حذف
                </p>{" "}
              </div>
            ) : (
              void 0
            )}
          </Card>
        </Grid>
      );
    }
    return galleryImages;
  }

  renderLocalGalleryImages(images) {
    console.log("images", images);
    var localImages = [];
    const { classes } = this.props;

    for (let i = 0; i < images.length; i++) {
      localImages.push(
        <Grid item xs={6} md={2}>
          <Card style={{ width: 130, height: 120, marginTop: 8 }}>
            <CardMedia
              // alt="Adelle Charles"
              image={URL.createObjectURL(this.props.localImages.images[i])}
              style={{
                position: "relative",
                margin: "auto",
                width: "100%",
                height: 90
              }}
            />
            {this.props.user.permissions["edit-news"] === true ? (
              <div
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => this.props.onRemoveLoacalImage(i)}
              >
                <Remove
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                />
                <p
                  style={{
                    display: "inline-block",
                    marginTop: 3,
                    fontWeight: "bold",
                    color: "#F44336",
                    verticalAlign: "middle",
                    marginRight: 4
                  }}
                >
                  حذف
                </p>{" "}
              </div>
            ) : (
              void 0
            )}
          </Card>
        </Grid>
      );
    }
    return localImages;
  }

  renderGalleryGraphic(graphics) {
    console.log("images", graphics);
    var galleryGraphic = [];
    const { classes } = this.props;
    for (let i = 0; i < graphics.length; i++) {
      galleryGraphic.push(
        <Grid item xs={6} md={2}>
          <Card style={{ width: 130, height: 120, marginTop: 8 }}>
            <CardMedia
              // alt="Adelle Charles"
              image={this.props.newsData.graphics[i]}
              style={{
                position: "relative",
                margin: "auto",
                width: "100%",
                height: 90
              }}
            />
            {this.props.user.permissions["edit-news"] === true ? (
              <div
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => this.props.onRemoveGraphic(i)}
              >
                <Remove
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                />
                <p
                  style={{
                    display: "inline-block",
                    marginTop: 3,
                    fontWeight: "bold",
                    color: "#F44336",
                    verticalAlign: "middle",
                    marginRight: 4
                  }}
                >
                  حذف
                </p>{" "}
              </div>
            ) : (
              void 0
            )}
          </Card>
        </Grid>
      );
    }
    return galleryGraphic;
  }

  renderLocalGalleryGraphic(graphics) {
    console.log("images", graphics);
    var localGraphics = [];
    const { classes } = this.props;

    for (let i = 0; i < graphics.length; i++) {
      localGraphics.push(
        <Grid item xs={6} md={2}>
          <Card style={{ width: 130, height: 120, marginTop: 8 }}>
            <CardMedia
              // alt="Adelle Charles"
              image={URL.createObjectURL(this.props.localGraphics.graphics[i])}
              style={{
                position: "relative",
                margin: "auto",
                width: "100%",
                height: 90
              }}
            />
            {this.props.user.permissions["edit-news"] === true ? (
              <div
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => this.props.onRemoveLoacalGraphic(i)}
              >
                <Remove
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                />
                <p
                  style={{
                    display: "inline-block",
                    marginTop: 3,
                    fontWeight: "bold",
                    color: "#F44336",
                    verticalAlign: "middle",
                    marginRight: 4
                  }}
                >
                  حذف
                </p>{" "}
              </div>
            ) : (
              void 0
            )}
          </Card>
        </Grid>
      );
    }
    return localGraphics;
  }

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
} //end of class

export default withStyles(styles)(
  connect(state => {
    return {
      user: state.user
    };
  })(EditNewsUI)
);
