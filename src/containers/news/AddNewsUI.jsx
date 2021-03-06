import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Remove, AddMedia, Tik } from "components/Icons";
import { connect } from "react-redux";
import FormHelperText from "@material-ui/core/FormHelperText";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import ReactPlayer from "react-player";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { green } from "@material-ui/core/colors";

const styles = theme => ({
  root: {
    overflowX: "auto",
    padding: 16
  },

  formControl: {
    color: green[400],
    "&$checked": {
      color: green[600]
    },
    // margin: theme.spacing.unit,
    marginTop: 8,
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
  lable: {
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
class AddNewsUI extends Component {
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
    return <div>{this.renderFormHeader()}</div>;
  }

  renderFormHeader = () => {
    console.log("tagssss", this.props.news.tag);
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={classes.root} justify="center" spacing={2}>
          <Grid item xs={12} md={7}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>اطلاعات خبر</p>
            <Paper className={classes.root}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={12} md={3}>
                  <FormControl
                    className={classes.formControl}
                    style={{ minWidth: 100 }}
                    error={this.props.errors.postsTypeId}
                  >
                    <InputLabel
                      htmlFor="type"
                      style={{
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                      }}
                    >
                      نوع خبر{" "}
                    </InputLabel>
                    <Select
                      value={this.props.news.postsTypeId}
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
                <Grid item xs={12} md={4}>
                  <TextField
                    id="search"
                    label="جستجو در دسته بندی اصلی"
                    type="search"
                    error={this.props.errors.categoryId}
                    helperText={this.props.errors.categoryId}
                    className={classes.textField}
                    InputLabelProps={{
                      className: classes.textFieldFormLabel
                    }}
                    onChange={e => {
                      this.props.search2(e.target.value);
                    }}
                    margin="normal"
                  />
                  <div style={{ height: 321, overflowY: "auto" }}>
                    {this.renderCategories2(this.props.filteredCategories2)}
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  {/* <FormControl
                    className={classes.formControl}
                    style={{ minWidth: 100 }}
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
                      value={this.props.news.categoryId}
                      // error={this.props.errorsProducts.unitType}
                      // formhelpertext={this.props.errorsProducts.unitType}
                      onChange={this.props.onCategoriesChange}
                      input={<Input id="type" />}
                    >
                      {this.props.categories
                        ? this.props.categories.map(n => {
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
                  </FormControl> */}

                  <TextField
                    id="search"
                    label="جستجو دسته بندی "
                    type="search"
                    error={this.props.errors.categoryIds}
                    helperText={this.props.errors.categoryIds}
                    className={classes.textField}
                    InputLabelProps={{
                      className: classes.textFieldFormLabel
                    }}
                    onChange={e => {
                      this.props.search(e.target.value);
                    }}
                    margin="normal"
                  />
                  <div style={{ height: 321, overflowY: "auto" }}>
                    {this.renderCategories(this.props.filteredCategories)}
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>
              اطلاعات افراد
            </p>
            <Paper className={classes.root}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl
                    style={{ minWidth: 100 }}
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
                      value={this.props.news.postsCreateTypeId}
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
                <Grid item xs={12} md={6}>
                  <FormControl
                    style={{ minWidth: 100 }}
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
                    {console.log("userId", this.props.news.userId)}
                    <Select
                      readOnly={this.props.user.groupId === 3}
                      value={this.props.news.userId}
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
                    style={{ minWidth: 100 }}
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
                      value={this.props.news.editorId}
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

                {this.props.user.groupId !== 3 ? (
                  <Grid item xs={12} md={6}>
                    <FormControl
                      style={{ minWidth: 100 }}
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
                      {console.log("publisherId", this.props.news.publisherId)}
                      {console.log(
                        " this.props.user.groupId",
                        this.props.user.groupId
                      )}

                      <Select
                        readOnly={this.props.user.groupId !== 1}
                        value={this.props.news.publisherId}
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
                ) : (
                  void 0
                )}

                <Grid item xs={12} md={6}>
                  <TextField
                    error={this.props.errors.photographer}
                    helperText={this.props.errors.photographer}
                    // id="required"
                    type="text"
                    label="عکاس"
                    value={this.props.news.photographer}
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
                    style={{ width: "50%", marginTop: 9 }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>جزئیات خبر</p>
            <Paper className={classes.root}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    error={this.props.errors.preTitle}
                    helperText={this.props.errors.preTitle}
                    // id="required"
                    type="text"
                    label="روتیتر"
                    multiline
                    style={{ width: "100%" }}
                    value={this.props.news.preTitle}
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

                <Grid item xs={12} md={4}>
                  <TextField
                    error={this.props.errors.title}
                    helperText={this.props.errors.title}
                    required
                    // id="required"
                    type="text"
                    label="تیتر"
                    multiline
                    value={this.props.news.title}
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

                <Grid item xs={12} md={4}>
                  <TextField
                    error={this.props.errors.postTitle}
                    helperText={this.props.errors.postTitle}
                    // id="required"
                    type="text"
                    label="زیر تیتر"
                    multiline
                    value={this.props.news.postTitle}
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

                <Grid item xs={12} md={8}>
                  <TextField
                    error={this.props.errors.lead}
                    helperText={this.props.errors.lead}
                    required
                    // id="required"
                    type="text"
                    label="لید"
                    multiline
                    value={this.props.news.lead}
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

                <Grid item xs={12} md={4}>
                  <TextField
                    error={this.props.errors.source}
                    helperText={this.props.errors.source}
                    // id="required"
                    type="  text"
                    label="منبع"
                    multiline
                    value={this.props.news.source}
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
          <Grid item xs={12} md={3}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>عکس اصلی</p>
            <input
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
            {this.props.news.testImage ? (
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
                      // alt="Adelle Charles"
                      image={this.props.news.testImage}
                      style={{
                        position: "relative",
                        margin: "auto",
                        width: 250,
                        height: 250,
                        cursor: "pointer"
                      }}
                    /> */}

                    <img
                      src={this.props.news.testImage}
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
            <FormHelperText style={{ color: "red" }}>
              {this.props.errors.testImage}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} md={9}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>متن خبر</p>
            <Editor
              apiKey="YOUR_API_KEY"
              init={{
                image_caption: true,
                // menubar: "insert tools",
                media_live_embeds: true,

                plugins:
                  "fullpage advcode code media print preview  powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount tinymcespellchecker a11ychecker imagetools textpattern help formatpainter permanentpen pageembed tinycomments mentions linkchecker image",
                language: "fa_IR",
                valid_elements: "+*[*]",
                extended_valid_elements: "+*[*]",
                custom_elements: "*",
                invalid_elements: "",
                verify_html: false,
                valid_children: "+body[style]",
                language_url: "/assets/tinymce/langs/fa_IR.js",
                toolbar:
                  "media| image |formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link   pageembed | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment|ltr rtl",
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
                height: 300,
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
                images_upload_url:
                  "http://golestanfori.ir/api/upload",
                automatic_uploads: true
              }}
              initialValue={this.props.news.body}
              // onChange={e => {
              //   this.props.onChangeEditor(e.target.getContent());
              // }}
              onChange={e => {
                this.props.onChangeEditor(e.target.getContent());
              }}
            />
          </Grid>
          {this.props.news.postsTypeId === 5 ? (
            <Grid item xs={12}>
              <p style={{ fontWeight: "bold", color: "#2196F3" }}>
                انتخاب عکس ها
              </p>
              <Paper className={classes.root}>
                <input
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
                      <AddMedia />
                    </label>
                  </div>

                  {/* </label> */}
                </div>

                {this.props.news.galleryImages.length > 0 ? (
                  <Grid container>
                    {this.renderGalleryImages(this.props.news.galleryImages)}
                  </Grid>
                ) : (
                  void 0
                )}
              </Paper>
            </Grid>
          ) : this.props.news.postsTypeId === 6 ? (
            <Grid item xs={12}>
              <p style={{ fontWeight: "bold", color: "#2196F3" }}>
                انتخاب فیلم ها
              </p>
              <Paper className={classes.root}>
                <input
                  ref="VideoUpload"
                  // accept=".png,.jpg,.jpeg"
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
                      <AddMedia />
                    </label>
                  </div>

                  {/* </label> */}
                </div>

                {this.props.news.videos.length > 0 ? (
                  <Grid container spacing={2}>
                    {this.renderGalleryVideos(this.props.news.videos)}
                  </Grid>
                ) : (
                  void 0
                )}
              </Paper>
            </Grid>
          ) : this.props.news.postsTypeId === 7 ? (
            <Grid item xs={12}>
              <p style={{ fontWeight: "bold", color: "#2196F3" }}>
                انتخاب گرافیک ها
              </p>
              <Paper className={classes.root}>
                <input
                  ref="GraphicUpload"
                  // accept=".png,.jpg,.jpeg"
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
                      <AddMedia />
                    </label>
                  </div>

                  {/* </label> */}
                </div>

                {this.props.news.graphics.length > 0 ? (
                  <Grid container spacing={2}>
                    {this.renderGalleryGraphics(this.props.news.graphics)}
                  </Grid>
                ) : (
                  void 0
                )}
              </Paper>
            </Grid>
          ) : (
            void 0
          )}

          <Grid item xs={12}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>تنظیمات خبر</p>
            <Paper className={classes.root}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={12} md={3}>
                  <FormControl
                    style={{ minWidth: 100 }}
                    className={classes.formControl}
                    error={this.props.errors.groupId}
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
                      value={this.props.news.groupId}
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
                    <FormHelperText style={{ color: "red" }}>
                      {this.props.errors.groupId}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl
                    className={classes.formControl}
                    style={{ minWidth: 100 }}
                    error={this.props.errors.groupPosition}
                  >
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
                      value={this.props.news.groupPosition}
                      // error={this.props.errorsProducts.unitType}
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
                    <FormHelperText style={{ color: "red" }}>
                      {this.props.errors.groupPosition}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl
                    style={{ minWidth: 100 }}
                    className={classes.formControl}
                    error={this.props.errors.template}
                  >
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
                      value={this.props.news.template}
                      // error={this.props.errorsProducts.unitType}
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
                    <FormHelperText style={{ color: "red" }}>
                      {this.props.errors.template}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <div style={{ marginTop: 24 }}>
                    <FormControlLabel
                      style={{
                        direction: "rtl",
                        fontFamily: "iransans",
                        fontSize: ".9rem"
                        // marginTop: 24
                      }}
                      className={classes.textFieldForm}
                      // label="نمایش در صفحه اول"
                      control={
                        <Checkbox
                          checked={
                            this.props.news.homePage === 0 ? false : true
                          }
                          onChange={this.props.onChangeAgeCheckbox}
                          value={this.props.news.homePage === 0 ? false : true}
                        />
                      }
                    />
                    <span
                      style={{
                        fontWeight: "bold",
                        display: "inline-Block",
                        fontSize: 12,
                        marginRight: 8
                        // marginTop: 24
                      }}
                    >
                      نمایش در لیست آخرین اخبار
                    </span>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {console.log("tagssss", this.props.news.tag)}
          <Grid item xs={12}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>برچسب ها</p>
            <Paper className={classes.root}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={12} md={4}>
                  <div style={{ display: "inline-block" }}>
                    <Button
                      disabled={this.props.busy}
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
                <Grid item xs={12} md={8}>
                  <Grid container justify="center" spacing={2}>
                    {console.log("tags", this.props.tag)}
                    {this.props.news.tag.length > 0
                      ? this.renderTagsChip(this.props.news.tag)
                      : void 0}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            {this.props.FilterTags ? (
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

                    // <p
                    //   style={{ cursor: "pointer" }}
                    //   onClick={event => this.props.OnClicTag(event, r.id)}
                    //   key={r.id}
                    // >
                    //   {r.name}
                    // </p>
                  );
                })}
              </div>
            ) : (
              void 0
            )}
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            style={{
              textAlign: "center",
              marginBottom: 16,
              marginTop: 16
            }}
          >
            {this.props.busy ? (
              <CircularProgress size={30} />
            ) : (
              <Button
                disabled={this.props.busy}
                onClick={this.props.onAddNews}
                style={{
                  fontFamily: "iransans",
                  fontSize: ".9rem",
                  background: "#2196F3",
                  color: "#fff"
                }}
              >
                ثبت
                <Tik style={{ marginRight: 8 }} />
              </Button>
            )}
          </Grid>
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
        <Grid item xs={6} md={3}>
          <Chip
            // icon={<Close onClick={this.props.onDeleteChip} />}
            style={{ padding: 12, cursor: "pointer" }}
            label={tags[i]}
            onDelete={() => this.props.onDeleteChip(i)}
            color="primary"
          />
        </Grid>
      );
    }
    return tag;
  }

  renderNameOfVideos(videos) {
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
              url={URL.createObjectURL(this.props.news.videos[i])}
            />

            <div
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => this.props.onRemoveVideos([i])}
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
              image={URL.createObjectURL(this.props.news.galleryImages[i])}
              style={{
                position: "relative",
                margin: "auto",
                width: "100%",
                height: 90
              }}
            />
            <div
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => this.props.onRemoveImage([i])}
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
          </Card>
        </Grid>
      );
    }
    return galleryImages;
  }

  renderGalleryGraphics(graphics) {
    console.log("images", graphics);
    var galleryGraphics = [];
    const { classes } = this.props;
    for (let i = 0; i < graphics.length; i++) {
      galleryGraphics.push(
        <Grid item xs={6} md={2}>
          <Card style={{ width: 130, height: 120, marginTop: 8 }}>
            <CardMedia
              // alt="Adelle Charles"
              image={URL.createObjectURL(this.props.news.graphics[i])}
              style={{
                position: "relative",
                margin: "auto",
                width: "100%",
                height: 90
              }}
            />
            <div
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => this.props.onRemoveGraphic([i])}
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
          </Card>
        </Grid>
      );
    }
    return galleryGraphics;
  }

  isSelected = id => this.props.selected.indexOf(id) !== -1;

  renderCategories(categories) {
    console.log("data", categories);
    // console.log("categoryId", categoryId);

    var rows = null;

    if (
      categories === undefined ||
      categories === null ||
      categories.length === 0
    ) {
      return rows; // null
    }

    rows = this.createCategoriesList(categories).map(n => {
      const isSelected = this.isSelected(n.id);

      return (
        // <MenuItem
        //   value={n.id}
        //   key={n.id}
        //   style={{
        //     fontFamily: "iransans",
        //     fontSize: ".9rem"
        //   }}
        // >
        <div onClick={() => this.props.onCategoriesChange(n.id)}>
          <Checkbox
            checked={isSelected}
            style={{
              color: "#1daced",
              display: "inline-block"
            }}
          />

          <p style={{ display: "inline-block" }}> {n.name}</p>
        </div>
        // </MenuItem>  </MenuItem>
      );
    });

    return rows;
  }

  createCategoriesList(categories) {
    console.log("categories", categories);

    var categoriesBundle = [];

    if (categories === undefined || categories === null) {
      return categoriesBundle;
    }

    categories.map(category => {
      // console.log("category.id", category.id, "categoryId", categoryId);

      // if (category.id !== categoryId) {
      categoriesBundle.push({
        id: category.id,

        name: this.createCategoryNameByLevel(category.name, category.level)
      });
      if (category.subCategories != null && category.subCategories.length > 0) {
        categoriesBundle = [
          ...categoriesBundle,
          ...this.createCategoriesList(category.subCategories)
        ];
      }
      // }

      return void 0;
    });
    console.log("data", categoriesBundle);
    return categoriesBundle;
  }

  createCategoryNameByLevel(name, level) {
    if (level === 1) {
      return (
        <p
          style={{
            display: "inline-block",
            color: "#2196f3",
            marginTop: 0,
            marginBottom: 0
          }}
        >
          {" "}
          {name}
        </p>
      );
    }
    var newName = "";
    for (var i = 0; i < level - 1; i++) {
      newName += "  |  ";
    }
    return newName + " ---- " + name;
  }

  renderCategories2(categories) {
    console.log("data", categories);
    // console.log("categoryId", categoryId);

    var rows = null;

    if (
      categories === undefined ||
      categories === null ||
      categories.length === 0
    ) {
      return rows; // null
    }

    rows = this.createCategoriesList2(categories).map(n => {
      return (
        // <MenuItem
        //   value={n.id}
        //   key={n.id}
        //   style={{
        //     fontFamily: "iransans",
        //     fontSize: ".9rem"
        //   }}
        // >
        <div onClick={() => this.props.onCategoryChange(n.id)}>
          <Radio
            checked={this.props.news.categoryId === n.id}
            onChange={() => this.props.onCategoryChange(n.id)}
            value="a"
            name="radio-button-demo"
            style={{ display: "inline-block", cursor: "pointer" }}
            inputProps={{ "aria-label": "A" }}
          />
          <p style={{ display: "inline-block", cursor: "pointer" }}>
            {" "}
            {n.name}
          </p>
        </div>
        // </MenuItem>  </MenuItem>
      );
    });

    return rows;
  }

  createCategoriesList2(categories) {
    console.log("categories", categories);

    var categoriesBundle = [];

    if (categories === undefined || categories === null) {
      return categoriesBundle;
    }

    categories.map(category => {
      // console.log("category.id", category.id, "categoryId", categoryId);

      // if (category.id !== categoryId) {
      categoriesBundle.push({
        id: category.id,

        name: this.createCategoryNameByLevel2(category.name, category.level)
      });
      if (category.subCategories != null && category.subCategories.length > 0) {
        categoriesBundle = [
          ...categoriesBundle,
          ...this.createCategoriesList2(category.subCategories)
        ];
      }
      // }

      return void 0;
    });
    console.log("data", categoriesBundle);
    return categoriesBundle;
  }

  createCategoryNameByLevel2(name, level) {
    if (level === 1) {
      return (
        <p
          style={{
            display: "inline-block",
            color: "#2196f3",
            marginTop: 0,
            marginBottom: 0
          }}
        >
          {" "}
          {name}
        </p>
      );
    }
    var newName = "";
    for (var i = 0; i < level - 1; i++) {
      newName += "  |  ";
    }
    return newName + " ---- " + name;
  }
}

export default withStyles(styles)(
  connect(state => {
    return {
      user: state.user
    };
  })(AddNewsUI)
);
