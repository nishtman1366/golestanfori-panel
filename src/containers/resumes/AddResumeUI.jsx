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

const styles = theme => ({
  root: {
    overflowX: "auto",
    padding: 16
  },

  formControl: {
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
class AddResumeUI extends Component {
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
    console.log("person", this.props.person);
    return (
      <div style={{ marginTop: 16, marginBottom: 16 }}>
        {this.renderFormHeader()}
      </div>
    );
  }

  renderFormHeader = () => {
    const { classes } = this.props;
    return (
      <div>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} md={10}>
            <Paper className={classes.root}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={12} md={4}>
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
                  {this.props.person.image ? (
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
                          <img
                            src={this.props.person.image}
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
                        <Card
                          style={{
                            width: 250,
                            height: 200,
                            position: "relative",
                            background: "#000"
                          }}
                        >
                          <CardMedia
                            alt="تصویر "
                            image="/images/emptyUser.jpg"
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
                  )}
                  <FormHelperText style={{ color: "red" }}>
                    {this.props.errors.image}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container justify="center" spacing={1}>
                    <Grid item xs={12} md={12}>
                      <TextField
                        error={this.props.errors.name}
                        helperText={this.props.errors.name}
                        // id="required"
                        type="text"
                        required
                        label="نام و نام خانوادگی"
                        value={this.props.person.name}
                        onChange={e => {
                          this.props.onChangeTextFieldData(
                            "name",
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
                        style={{ marginTop: 9, width: "40%" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={this.props.errors.birth}
                        helperText={this.props.errors.birth}
                        placeholder="مثال : 1370"
                        type="number"
                        label="سال تولد"
                        value={this.props.person.birth}
                        onChange={e => {
                          this.props.onChangeTextFieldData(
                            "birth",
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
                        style={{ marginTop: 9, width: "80%" }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        error={this.props.errors.birthLocation}
                        helperText={this.props.errors.birthLocation}
                        // id="required"
                        type="text"
                        label="محل تولد"
                        value={this.props.person.birthLocation}
                        onChange={e => {
                          this.props.onChangeTextFieldData(
                            "birthLocation",
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
                        style={{ marginTop: 9, width: "80%" }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        error={this.props.errors.fatherName}
                        helperText={this.props.errors.fatherName}
                        // id="required"
                        type="text"
                        label="نام پدر"
                        value={this.props.person.fatherName}
                        onChange={e => {
                          this.props.onChangeTextFieldData(
                            "fatherName",
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
                        style={{ marginTop: 9, width: "80%" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        error={this.props.errors.lastJob}
                        helperText={this.props.errors.lastJob}
                        // id="required"
                        type="text"
                        label="سمت"
                        value={this.props.person.lastJob}
                        onChange={e => {
                          this.props.onChangeTextFieldData(
                            "lastJob",
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
                        style={{ marginTop: 9, width: "80%" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={10}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={12} md={4}>
                <p style={{ fontWeight: "bold", color: "#2196F3" }}>
                  دسته بندی
                </p>
                <Paper style={{ padding: 8 }}>
                  <Grid item xs={12} style={{ marginTop: 0 }}>
                    <TextField
                      id="search"
                      error={this.props.errors.resumeCategoryId}
                      helperText={this.props.errors.resumeCategoryId}
                      label="جستجو"
                      type="search"
                      className={classes.textField}
                      InputLabelProps={{
                        className: classes.textFieldFormLabel
                      }}
                      onChange={e => {
                        this.props.search(e.target.value);
                      }}
                      style={{ marginTop: 0 }}
                      margin="normal"
                    />
                    <div style={{ height: 300 }}>
                      {" "}
                      {this.renderCategories(this.props.filteredCategories)}
                    </div>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container justify="center" spacing={1}>
                  <Grid item xs={12}>
                    <p style={{ fontWeight: "bold", color: "#2196F3" }}>
                      معرفی اجمالی
                    </p>
                    <Editor
                      apiKey="YOUR_API_KEY"
                      init={{
                        menubar: "",

                        plugins:
                          "   print preview powerpaste   directionality   visualchars      template   charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount tinymcespellchecker",
                        language: "fa_IR",
                        language_url: "/assets/tinymce/langs/fa_IR.js",
                        toolbar:
                          " |formatselect | bold  strikethrough   permanentpen formatpainter | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  |ltr rtl",
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
                            callback(
                              "https://www.google.com/logos/google.jpg",
                              {
                                text: "My text"
                              }
                            );
                          }

                          /* Provide image and alt text for the image dialog */
                          if (meta.filetype === "image") {
                            callback(
                              "https://www.google.com/logos/google.jpg",
                              {
                                alt: "My alt text"
                              }
                            );
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
                        images_upload_url: "http://192.168.1.6:8001/api/upload",
                        automatic_uploads: true
                      }}
                      initialValue={this.props.person.body}
                      // onChange={e => {
                      //   this.props.onChangeTextFieldData(e.target.getContent());
                      // }}
                      onChange={e => {
                        this.props.onChangeTextFieldData(
                          "body",
                          e.target.getContent()
                        );
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} md={5}>
              <p style={{ fontWeight: "bold", color: "#2196F3" }}>سوابق شغلی</p>
              <Editor
                apiKey="YOUR_API_KEY"
                init={{
                  menubar: "",

                  plugins:
                    "   print preview  powerpaste   directionality   visualchars      template   charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount tinymcespellchecker",
                  language: "fa_IR",
                  language_url: "/assets/tinymce/langs/fa_IR.js",
                  toolbar:
                    " |formatselect | bold  strikethrough   permanentpen formatpainter | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  |ltr rtl",
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
                  images_upload_url: "http://192.168.1.6:8001/api/upload",
                  automatic_uploads: true
                }}
                initialValue={this.props.person.jobRecords}
                // onChange={e => {
                //   this.props.onChangeTextFieldData(e.target.getContent());
                // }}
                onChange={e => {
                  this.props.onChangeTextFieldData(
                    "jobRecords",
                    e.target.getContent()
                  );
                }}
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <p style={{ fontWeight: "bold", color: "#2196F3" }}>
                سوابق تحصیلی
              </p>
              <Editor
                apiKey="YOUR_API_KEY"
                init={{
                  menubar: "",

                  plugins:
                    "   print preview  powerpaste   directionality   visualchars      template   charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount tinymcespellchecker",
                  language: "fa_IR",
                  language_url: "/assets/tinymce/langs/fa_IR.js",
                  toolbar:
                    " |formatselect | bold  strikethrough   permanentpen formatpainter | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  |ltr rtl",
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
                  images_upload_url: "http://192.168.1.6:8001/api/upload",
                  automatic_uploads: true
                }}
                initialValue={this.props.person.educationRecords}
                // onChange={e => {
                //   this.props.onChangeTextFieldData(e.target.getContent());
                // }}
                onChange={e => {
                  this.props.onChangeTextFieldData(
                    "educationRecords",
                    e.target.getContent()
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={12} md={5}>
              <p style={{ fontWeight: "bold", color: "#2196F3" }}>
                علاقه مندی ها
              </p>
              <Editor
                apiKey="YOUR_API_KEY"
                init={{
                  menubar: "",

                  plugins:
                    "   print preview  powerpaste   directionality   visualchars      template   charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount tinymcespellchecker",
                  language: "fa_IR",
                  language_url: "/assets/tinymce/langs/fa_IR.js",
                  toolbar:
                    " |formatselect | bold  strikethrough   permanentpen formatpainter | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  |ltr rtl",
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
                  images_upload_url: "http://192.168.1.6:8001/api/upload",
                  automatic_uploads: true
                }}
                initialValue={this.props.person.favorites}
                // onChange={e => {
                //   this.props.onChangeTextFieldData(e.target.getContent());
                // }}
                onChange={e => {
                  this.props.onChangeTextFieldData(
                    "favorites",
                    e.target.getContent()
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <p style={{ fontWeight: "bold", color: "#2196F3" }}>گواهی‌ها</p>
              <Editor
                apiKey="YOUR_API_KEY"
                init={{
                  menubar: "",

                  plugins:
                    "   print preview  powerpaste   directionality   visualchars      template   charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount tinymcespellchecker",
                  language: "fa_IR",
                  language_url: "/assets/tinymce/langs/fa_IR.js",
                  toolbar:
                    " |formatselect | bold  strikethrough   permanentpen formatpainter | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  |ltr rtl",
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
                  images_upload_url: "http://192.168.1.6:8001/api/upload",
                  automatic_uploads: true
                }}
                initialValue={this.props.person.licenses}
                // onChange={e => {
                //   this.props.onChangeTextFieldData(e.target.getContent());
                // }}
                onChange={e => {
                  this.props.onChangeTextFieldData(
                    "licenses",
                    e.target.getContent()
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={12} md={5}>
              <p style={{ fontWeight: "bold", color: "#2196F3" }}>
                {" "}
                سوابق علمی (کتاب‌‌ها و مقالات)
              </p>
              <Editor
                apiKey="YOUR_API_KEY"
                init={{
                  menubar: "",

                  plugins:
                    "   print preview  powerpaste   directionality   visualchars      template   charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount tinymcespellchecker",
                  language: "fa_IR",
                  language_url: "/assets/tinymce/langs/fa_IR.js",
                  toolbar:
                    " |formatselect | bold  strikethrough   permanentpen formatpainter | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  |ltr rtl",
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
                  images_upload_url: "http://192.168.1.6:8001/api/upload",
                  automatic_uploads: true
                }}
                initialValue={this.props.person.scientificRecords}
                // onChange={e => {
                //   this.props.onChangeTextFieldData(e.target.getContent());
                // }}
                onChange={e => {
                  this.props.onChangeTextFieldData(
                    "scientificRecords",
                    e.target.getContent()
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <p style={{ fontWeight: "bold", color: "#2196F3" }}>
                سوابق مدیریتی
              </p>
              <Editor
                apiKey="YOUR_API_KEY"
                init={{
                  menubar: "",

                  plugins:
                    "   print preview  powerpaste   directionality   visualchars      template   charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount tinymcespellchecker",
                  language: "fa_IR",
                  language_url: "/assets/tinymce/langs/fa_IR.js",
                  toolbar:
                    " |formatselect | bold  strikethrough   permanentpen formatpainter | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  |ltr rtl",
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
                  images_upload_url: "http://192.168.1.6:8001/api/upload",
                  automatic_uploads: true
                }}
                initialValue={this.props.person.managementRecords}
                // onChange={e => {
                //   this.props.onChangeTextFieldData(e.target.getContent());
                // }}
                onChange={e => {
                  this.props.onChangeTextFieldData(
                    "managementRecords",
                    e.target.getContent()
                  );
                }}
              />
            </Grid>
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
                onClick={this.props.onAddResume}
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
    // console.log("categoryId", categoryId);

    var categoriesBundle = [];

    if (categories === undefined || categories === null) {
      return categoriesBundle;
    }

    categories.map(category => {
      // console.log("category.id", category.id, "categoryId", categoryId);

      // if (category.id !== categoryId) {
      categoriesBundle.push({
        id: category.id,
        productCount: category.productCount,

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
}

export default withStyles(styles)(
  connect(state => {
    return {
      user: state.user
    };
  })(AddResumeUI)
);
