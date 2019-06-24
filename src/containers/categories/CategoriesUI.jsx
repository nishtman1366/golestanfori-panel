import React, { Component } from "react";
import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Fab from "@material-ui/core/Fab";

import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { USERS } from "components/StatesIcons";
import Loading from "containers/Loading";
import { OPERATION_FAILED } from "components/StatesIcons";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import {
  AddD,
  Warning,
  AddCategory,
  Add,
  Enseraf,
  Tik
} from "components/Icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#2196F3",
    color: theme.palette.common.white,
    fontSize: 14,
    fontFamily: "iransans"
  },
  body: {
    // fontSize: 32
  }
}))(TableCell);

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5)
  }
});

class TablePaginationActions extends React.Component {
  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  fab: {
    margin: theme.spacing(1)
  },
  table: {
    width: "100%"
  },
  fontFamily: "iransans",
  fontSize: ".9rem",
  tableWrapper: {
    overflowX: "auto"
  },
  card: {
    maxWidth: 345
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120
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
    maxHeight: "600px",
    width: "400px"
  }
});

class CategoriesUI extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      page: 0,
      rowsPerPage: 5
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  render() {
    console.log("category", this.props.categoryName);
    return (
      <div>
        {this.renderTable()}
        {this.renderAddDialog()}
        {this.props.categoryName ? this.renderCategoryEditdialog() : void 0}
        {this.renderFabButton()}
        {this.renderDeleteDialog()}
      </div>
    );
  }

  renderAddDialog = () => {
    const { classes } = this.props;

    return (
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={this.props.OpenModal}
        // onClose={this.props.OnCloseModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="add" style={{ textAlign: "center" }}>
          <AddCategory />
        </DialogTitle>
        <DialogContent>{this.renderAddDialogBody()}</DialogContent>
        <Grid
          container
          alignItems="center"
          justify="space-around"
          style={{ marginBottom: "8px" }}
        >
          <Button
            disabled={this.props.busy}
            onClick={this.props.OnCloseModal}
            style={{
              fontFamily: "iransans",
              color: "#fff",
              fontSize: ".9rem",
              background: "#f44336"
            }}
          >
            انصراف
            <Enseraf style={{ marginRight: 8 }} />
          </Button>

          {this.props.busy ? (
            <CircularProgress size={30} />
          ) : (
            <Button
              onClick={this.props.OnAddCategory}
              // autoFocus
              style={{
                color: "#fff",
                fontFamily: "iransans",
                fontSize: ".9rem",
                background: "#4caf50"
              }}
            >
              تایید
              <Tik style={{ marginRight: 8 }} />
            </Button>
          )}
        </Grid>
      </Dialog>
    );
  };

  renderAddDialogBody = () => {
    const { classes } = this.props;

    return (
      <div>
        <Grid
          container
          // className={classes.root}
          justify="center"
          alignItems="center"
        >
          {/* <form onSubmit={this.props.OnAddCategory}> */}
          {/* <Grid container spacing={8} alignItems="center" justify="center"> */}
          <Grid container item xs={12} alignItems="center" justify="center">
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
            {this.props.category.image ? (
              <div>
                <label htmlFor="raised-pic1-file">
                  <Card className={classes.card}>
                    <CardMedia
                      // alt="Adelle Charles"
                      image={this.props.category.image}
                      style={{
                        position: "relative",
                        margin: "auto",
                        width: 84,
                        height: 84,
                        cursor: "pointer"
                      }}
                    />
                  </Card>
                </label>
              </div>
            ) : (
              <div>
                <label htmlFor="raised-pic1-file">
                  <Card className={classes.card}>
                    <CardMedia
                      // alt="Adelle Charles"
                      image="/images/empty.png"
                      style={{
                        position: "relative",
                        margin: "auto",
                        width: 84,
                        height: 84,
                        cursor: "pointer",
                        textAlign: "center"
                      }}
                    />
                  </Card>
                </label>
              </div>
            )}
          </Grid>

          <Grid item>
            <TextField
              error={this.props.errors.name}
              helperText={this.props.errors.name}
              required
              autoFocus={true}
              // id="required"
              type="text"
              label="نام دسته بندی"
              multiline
              value={this.props.category.name}
              onChange={e => {
                this.props.OnCategoryTitleChange(e.target.value);
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

          {/* <input
                style={{ display: "none" }}
                ref="image"
                accept=".png,.jpg,.jpeg"
                className={classes.input}
                id="raised-image-file"
                multiple
                type="file"
                onChange={event => {
                  this.props.OnPictureChange(event);
                  this.refs.image.value = "";
                }}
              />
              <label htmlFor="raised-image-file">
                <Button variant="raised" component="span">
                  بارگزاری عکس
                </Button>
              </label> */}
        </Grid>
        <button type="submit" hidden />
        {/* </form> */}
        {/* </Grid> */}
      </div>
    );
  };

  renderCategoryEditdialog = () => {
    const { classes } = this.props;
    console.log("");
    return (
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={this.props.OpenEditModal}
        // onClose={this.props.OnCloseModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="add" style={{ textAlign: "center" }}>
          <AddCategory />
        </DialogTitle>
        <DialogContent>{this.renderEditDialogBody()}</DialogContent>
        <Grid
          container
          alignItems="center"
          justify="space-around"
          style={{ marginBottom: "8px" }}
        >
          <Button
            disabled={this.props.busy}
            onClick={this.props.OnCloseEditModal}
            style={{
              fontFamily: "iransans",
              color: "#fff",
              fontSize: ".9rem",
              background: "#f44336"
            }}
          >
            انصراف
            <Enseraf style={{ marginRight: 8 }} />
          </Button>

          {this.props.busy ? (
            <CircularProgress size={30} />
          ) : (
            <Button
              onClick={this.props.OnEditCategory}
              // autoFocus
              style={{
                color: "#fff",
                fontFamily: "iransans",
                fontSize: ".9rem",
                background: "#4caf50"
              }}
            >
              تایید
              <Tik style={{ marginRight: 8 }} />
            </Button>
          )}
        </Grid>
      </Dialog>
    );
  };

  renderEditDialogBody = () => {
    const { classes } = this.props;

    return (
      <div>
        <form
          noValidate
          autoComplete="off"
          onSubmit={this.props.OnEditCategory}
        >
          <Grid
            container
            // className={classes.root}
            justify="center"
            alignItems="center"
          >
            <Grid container item xs={12} md={12} justify="center">
              <input
                ref="pic1"
                accept=".png,.jpg,.jpeg"
                className={classes.input}
                id="raised-pic1-file"
                multiple
                type="file"
                onChange={event => {
                  this.props.OnPictureChange(event);
                  this.refs.pic1.value = "";
                }}
                style={{ display: "none" }}
              />
              {this.props.categoryName.image ? (
                <div>
                  <label htmlFor="raised-pic1-file">
                    <Card className={classes.card}>
                      <CardMedia
                        // alt="Adelle Charles"
                        image={this.props.categoryName.image}
                        style={{
                          position: "relative",
                          margin: "auto",
                          width: 84,
                          height: 84,
                          cursor: "pointer"
                        }}
                      />
                    </Card>
                  </label>
                </div>
              ) : (
                void 0
              )}
            </Grid>
            <Grid container item xs={12} md={6}>
              <TextField
                autoFocus
                // error={this.props.states.errors.firstName.length > 0}
                required
                //   disabled={
                //     this.props.user.permissions["products-write"] === false
                //   }
                error={this.props.errors.name}
                helperText={this.props.errors.name}
                id="firstName"
                label="نام"
                // autocomplete="firstName"
                value={this.props.categoryName.name}
                onChange={e => {
                  this.props.OnEditCategoryNameChange(e.target.value);
                }}
                InputProps={{
                  className: classes.textFieldForm
                }}
                className={classes.textField}
                InputLabelProps={{
                  className: classes.textFieldFormLabel
                }}
                margin="normal"
              />
            </Grid>
            {console.log("parentId", this.props.categoryName.parentId)}
            <Grid container item xs={12} md={6} style={{ marginTop: 6 }}>
              <FormControl className={classes.formControl}>
                <InputLabel
                  htmlFor="type"
                  style={{
                    fontFamily: "iransans",
                    fontSize: ".9rem"
                  }}
                >
                  دسته بندی پدر
                </InputLabel>
                <Select
                  value={
                    this.props.categoryName.parentId !== null
                      ? this.props.categoryName.parentId
                      : 0
                  }
                  // error={this.props.errorsProducts.unitType}
                  // formhelpertext={this.props.errorsProducts.unitType}
                  onChange={this.props.OnChangeParent}
                  input={<Input id="type" />}
                >
                  <MenuItem
                    value={0}
                    // key={n.id}
                    style={{
                      fontFamily: "iransans",
                      fontSize: ".9rem"
                    }}
                  >
                    بدون والد
                  </MenuItem>
                  {this.renderSelectCategories(
                    this.props.data,
                    this.props.categoryName.id
                  )}
                </Select>
              </FormControl>
            </Grid>

            <button type="submit" hidden />
          </Grid>
        </form>
      </div>
    );
  };

  renderDeleteDialog = () => {
    const { fullScreen } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.OpenDeleteModal}
        // onClose={this.props.onCloseDeleteCateogry}
        aria-labelledby="responsive-title"
      >
        <DialogTitle id="delet" style={{ textAlign: "center" }}>
          <Warning />
        </DialogTitle>

        <DialogContent>{this.renderDeleteDialogBody()}</DialogContent>
        <Grid
          container
          alignItems="center"
          justify="space-around"
          style={{ marginBottom: "8px" }}
        >
          <Button
            disabled={this.props.busy}
            onClick={this.props.OnCloseDeleteModal}
            style={{
              fontFamily: "iransans",
              color: "#fff",
              fontSize: ".9rem",
              background: "#f44336"
            }}
          >
            انصراف
            <Enseraf style={{ marginRight: 8 }} />
          </Button>
          {this.props.busy ? (
            <CircularProgress size={30} />
          ) : (
            <Button
              onClick={this.props.OnDeleteCategories}
              color="secondary"
              style={{
                color: "#fff",
                fontFamily: "iransans",
                fontSize: ".9rem",
                background: "#4caf50"
              }}
            >
              بلی
              <Tik style={{ marginRight: 8 }} />
            </Button>
          )}
        </Grid>
      </Dialog>
    );
  };

  renderDeleteDialogBody = () => {
    return (
      <div>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{
              fontFamily: "iransans",
              fontSize: ".9rem",
              margin: "8px"
            }}
          >
            آیا از حذف دسته بندی اطمینان دارید؟
          </DialogContentText>
        </DialogContent>
      </div>
    );
  };

  renderFabButton = () => {
    const { classes } = this.props;

    return (
      // <Button
      //   onClick={this.props.OnClickOpen}
      //   variant="fab"
      //   color="primary"
      //   aria-label="add"
      //   style={{
      //     margin: 0,
      //     top: "auto",
      //     bottom: 20,
      //     left: "auto",
      //     position: "fixed",
      //     zIndex: 999,
      //     backgroundColor: "#2196f3",
      //     color: "#fff"
      //   }}
      // >
      //   <AddIcon />
      // </Button>

      <Fab
        onClick={this.props.OnClickOpen}
        color="primary"
        aria-label="Add"
        style={{
          margin: 0,
          top: "auto",
          bottom: 20,
          left: "auto",
          position: "fixed",
          zIndex: 999,
          backgroundColor: "#2196f3",
          color: "#fff"
        }}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
    );
  };

  renderTable = () => {
    const { onSelectAllClick, numSelected, rowCount, classes } = this.props;
    console.log("data", this.props.data);
    var component;

    if (this.props.isLoading) {
      component = (
        <div style={{ top: 32 }}>
          <Loading />
        </div>
      );
    } else if (this.props.data === undefined) {
      component = (
        <div style={{ marginTop: "15%" }}>
          <Grid container justify="center" alignItems="center">
            {OPERATION_FAILED}
          </Grid>

          <p
            style={{ fontSize: ".8rem", color: "#999999", textAlign: "center" }}
          >
            در دریافت اطلاعات از سرور
          </p>
        </div>
      );
    } else {
      const { rowsPerPage, page } = this.state;
      const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, this.props.data.length - page * rowsPerPage);

      component = (
        <div style={{ marginBottom: 16 }}>
          <Grid
            container
            className={classes.root}
            justify="center"
            alignItems="stretch"
          >
            <Grid item xs={11}>
              <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <CustomTableCell
                          style={{ textAlign: "right", padding: "0" }}
                        >
                          <Checkbox
                            indeterminate={
                              numSelected > 0 && numSelected < rowCount
                            }
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                            style={{ display: "none" }}
                          />
                        </CustomTableCell>
                        <CustomTableCell style={{ textAlign: "right" }}>
                          ردیف
                        </CustomTableCell>
                        <CustomTableCell
                          style={{ textAlign: "right", padding: "0" }}
                        >
                          نام
                        </CustomTableCell>

                        <CustomTableCell style={{ textAlign: "right" }}>
                          تعداد پست
                        </CustomTableCell>

                        <CustomTableCell style={{ textAlign: "right" }}>
                          افزودن زیر مجموعه
                        </CustomTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.renderCategories(
                        this.props.data,
                        page,
                        rowsPerPage
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
    }

    return component;
  };

  isSelected = id => this.props.selected.indexOf(id) !== -1;

  renderCategories(categories, page, rowsPerPage) {
    const { classes } = this.props;

    var rows = null;
    var rowNumber = 1;

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
        const isSelected = this.isSelected(n.id);
        return (
          <TableRow
            hover
            onClick={event => this.props.OnClick(event, n.id)}
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={-1}
            key={n.id}
            selected={isSelected}
            style={{ whiteSpace: "pre-wrap" }}
          >
            <TableCell
              padding="checkbox"
              style={{ textAlign: "right", padding: "0" }}
            >
              <Checkbox
                checked={isSelected}
                style={{
                  color: "#1daced",
                  display: "inline-flex"
                }}
              />
            </TableCell>
            <CustomTableCell
              component="th"
              scope="row"
              style={{ textAlign: "right" }}
            >
              {rowNumber++}
            </CustomTableCell>
            <CustomTableCell
              numeric
              style={{ textAlign: "right", padding: "0" }}
            >
              {n.name}
            </CustomTableCell>

            <CustomTableCell style={{ textAlign: "right" }}>
              {n.postsCount}
            </CustomTableCell>
            <CustomTableCell numeric style={{ textAlign: "right" }}>
              <Fab
                size="small"
                aria-label="Add"
                className={classes.margin}
                style={{ backgroundColor: "#2196f3", color: "#fff" }}
              >
                <AddIcon />
              </Fab>
            </CustomTableCell>
          </TableRow>
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
      return <span style={{ fontWeight: "bold" }}>{name}</span>;
    }
    var newName = [];
    for (var i = 0; i < level - 1; i++) {
      newName.push(
        <span
          style={{
            marginRight: newName.length === 0 ? level * 8 : 4,
            marginLeft: 4,
            position: "relative",
            fontSize: 24,
            top: 4
          }}
        >
          {"•"}
        </span>
      );
    }
    return (
      <span>
        <span style={{ position: "relative", fontSize: 24, top: 4 }}>
          {newName}
        </span>
        {name}
      </span>
    );
  }

  renderSelectCategories(categories, categoryId) {
    console.log("data", categories);
    console.log("categoryId", categoryId);

    var rows = null;

    if (
      categories === undefined ||
      categories === null ||
      categories.length === 0
    ) {
      return rows; // null
    }

    rows = this.createSelectCategoriesList(categories, categoryId).map(n => {
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

  createSelectCategoriesList(categories, categoryId) {
    console.log("categoryId", categoryId);

    var categoriesBundle = [];

    if (categories === undefined || categories === null) {
      return categoriesBundle;
    }

    categories.map(category => {
      console.log("category.id", category.id, "categoryId", categoryId);

      if (category.id !== categoryId) {
        categoriesBundle.push({
          id: category.id,
          productCount: category.productCount,

          name: this.createCategorySelectNameByLevel(
            category.name,
            category.level
          )
        });
        if (
          category.subCategories != null &&
          category.subCategories.length > 0
        ) {
          categoriesBundle = [
            ...categoriesBundle,
            ...this.createSelectCategoriesList(
              category.subCategories,
              categoryId
            )
          ];
        }
      }

      return void 0;
    });

    return categoriesBundle;
  }

  createCategorySelectNameByLevel(name, level) {
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
  })(CategoriesUI)
);
