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
class AddContentsUI extends Component {
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
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={classes.root} justify="center" spacing={2}>
          <Grid item xs={12} md={10}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>اطلاعات مطلب</p>
            <Paper className={classes.root}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={12} md={8}>
                  <Grid container justify="center" spacing={2}>
                    <Grid item xs={12} md={3}>
                      <TextField
                        error={this.props.errors.title}
                        helperText={this.props.errors.title}
                        // id="required"
                        type="text"
                        label="عنوان"
                        required
                        value={this.props.content.title}
                        onChange={e => {
                          this.props.onChangeTextFieldData(
                            "title",
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
                        style={{ marginTop: 9 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={9}>
                      <TextField
                        error={this.props.errors.lead}
                        helperText={this.props.errors.lead}
                        // id="required"
                        type="text"
                        required
                        multiline
                        label="متن خلاصه"
                        value={this.props.content.lead}
                        onChange={e => {
                          this.props.onChangeTextFieldData(
                            "lead",
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
                        style={{ marginTop: 9, width: "90%" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Grid container justify="center" spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextField
                        id="search"
                        label="جستجو"
                        error={this.props.errors.contentCategoryId}
                        helperText={this.props.errors.contentCategoryId}
                        type="search"
                        className={classes.textField}
                        InputLabelProps={{
                          className: classes.textFieldFormLabel
                        }}
                        onChange={e => {
                          this.props.search(e.target.value);
                        }}
                        margin="normal"
                      />
                      <div style={{ height: 300, overflowY: "auto" }}>
                        {this.renderCategories(this.props.filteredCategories)}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>عکس</p>
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
            {this.props.content.image ? (
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
                      image={this.props.content.testImage}
                      style={{
                        position: "relative",
                        margin: "auto",
                        width: 250,
                        height: 250,
                        cursor: "pointer"
                      }}
                    /> */}

                    <img
                      src={this.props.content.image}
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
              {this.props.errors.image}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} md={7}>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>متن مطلب</p>
            <Editor
              apiKey="YOUR_API_KEY"
              init={{
                extended_valid_elements: "script[src|async|defer|type|charset]",

                image_caption: true,
                // menubar: "insert tools",
                media_live_embeds: true,

                plugins:
                  "advcode code media print preview  powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount tinymcespellchecker a11ychecker imagetools textpattern help formatpainter permanentpen pageembed tinycomments mentions linkchecker image",
                language: "fa_IR",
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
              initialValue={this.props.content.body}
              // onChange={e => {
              //   this.props.onChangeEditor(e.target.getContent());
              // }}
              onChange={e => {
                this.props.onChangeEditor(e.target.getContent());
              }}
            />
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
                onClick={this.props.onAddContent}
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
  })(AddContentsUI)
);
