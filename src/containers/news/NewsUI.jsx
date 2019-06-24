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
import Fab from "@material-ui/core/Fab";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { USERS } from "components/StatesIcons";
import { Edit, Warning, AddCategory, Trash } from "components/Icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#2196F3",
    color: theme.palette.common.white,
    fontSize: 14,
    fontFamily: "iransans"
  },
  body: {
    fontFamily: "iransans"
  }
}))(TableCell);

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
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
    // marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  bigAvatar: {
    width: 76,
    height: 76
  },
  table: {
    width: "100%"
  },
  card: {
    maxWidth: 200
  },
  media: {
    height: 60
  },
  tableWrapper: {
    overflowX: "auto"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  formControl: {
    margin: theme.spacing.unit,
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
  fab: {
    margin: theme.spacing(1)
  }
});
class NewsUI extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      page: 0,
      rowsPerPage: 100
    };
  }
  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.refs.dialogConfirmButton.props.onTouchTap();
    }
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  render() {
    return (
      <div style={{ marginTop: 24 }}>
        {this.renderUI()}

        {this.renderFabButton()}

        {this.renderDeleteDialog()}
        {this.renderAddNewsToGroupDialog()}
      </div>
    );
  }
  isSelected = id => this.props.selected.indexOf(id) !== -1;

  renderAddNewsToGroupDialog = () => {
    const { classes } = this.props;

    return (
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={this.props.OpenAddToGroupModal}
        // onClose={this.props.OnCloseModalDelete}
        aria-labelledby="responsive-title"
      >
        <DialogTitle id="delet" style={{ textAlign: "center" }}>
          {/* <AddIcon /> */}
          <p>لطفا یکی از گروه‌های زیر را انتخاب کنید</p>
        </DialogTitle>

        <DialogContent>{this.renderAddToGroupDialogBody()}</DialogContent>
        <Grid
          container
          alignItems="center"
          justify="space-around"
          style={{ marginBottom: "8px" }}
        >
          <Button
            disabled={this.props.busy}
            onClick={this.props.OnCloseAddToGroup}
            style={{
              fontFamily: "iransans",
              fontSize: ".9rem",
              background: "#f44336",
              color: "#fff"
            }}
          >
            انصراف
          </Button>
          {this.props.busy ? (
            <CircularProgress size={30} />
          ) : (
            <Button
              onClick={this.props.OnAddToGroup}
              style={{
                fontFamily: "iransans",
                fontSize: ".9rem",
                background: "#4caf50",
                color: "#fff"
              }}
            >
              بلی
            </Button>
          )}
        </Grid>
      </Dialog>
    );
  };

  renderAddToGroupDialogBody = () => {
    const { classes } = this.props;

    return (
      <div>
        <DialogContent>
          <Grid container className={classes.root} justify="center">
            <Grid item xs={12} md={12}>
              <FormControl className={classes.formControl}>
                <InputLabel
                  htmlFor="type"
                  style={{
                    fontFamily: "iransans",
                    fontSize: ".9rem"
                  }}
                >
                  گروه ها
                </InputLabel>
                <Select
                  value={this.props.groupId}
                  onChange={e => {
                    this.props.onChangeSelectFieldGroups(e.target.value);
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
              </FormControl>
            </Grid>
            {/* <Grid item xs={6} md={4}>
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
                <FormHelperText>{this.props.errors.editorId}</FormHelperText>
              </FormControl>
            </Grid> */}
          </Grid>
        </DialogContent>
      </div>
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
            آیا از حذف اطمینان دارید؟
          </DialogContentText>
        </DialogContent>
      </div>
    );
  };

  renderDeleteDialog = () => {
    const { fullScreen } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.OpenDeleteModal}
        // onClose={this.props.OnCloseModalDelete}
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
            onClick={this.props.OnCloseModalDelete}
            style={{
              fontFamily: "iransans",
              fontSize: ".9rem",
              background: "#f44336",
              color: "#fff"
            }}
          >
            انصراف
          </Button>
          {this.props.busy ? (
            <CircularProgress size={30} />
          ) : (
            <Button
              onClick={this.props.OnDeleteNews}
              style={{
                fontFamily: "iransans",
                fontSize: ".9rem",
                background: "#4caf50",
                color: "#fff"
              }}
            >
              بلی
            </Button>
          )}
        </Grid>
      </Dialog>
    );
  };
  renderFabButton = () => {
    const { classes } = this.props;

    return (
      <Fab
        href={"/AddNews"}
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

  renderUI = () => {
    console.log("pagein");
    const { onSelectAllClick, numSelected, rowCount } = this.props;

    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, this.props.news.length - page * rowsPerPage);

    var component;
    if (this.props.news.length > 0) {
      component = (
        <div>
          {/* <Grid item xs={12} md={4}>
            <TextField
              id="search"
              label="جستجو"
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
          </Grid> */}
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
                          // padding="checkbox"
                          style={{
                            textAlign: "right",
                            padding: "0"
                          }}
                        >
                          <Checkbox
                            style={{
                              color: "#1daced",
                              display: "none",
                              padding: 0
                            }}
                          />
                        </CustomTableCell>
                        <CustomTableCell
                          style={{ textAlign: "right", padding: 0 }}
                        >
                          ردیف
                        </CustomTableCell>

                        <CustomTableCell
                          style={{ textAlign: "right", padding: 0 }}
                        >
                          تصویر
                        </CustomTableCell>

                        <CustomTableCell
                          style={{ textAlign: "right", padding: 0 }}
                        >
                          دسته بندی
                        </CustomTableCell>
                        <CustomTableCell
                          style={{ textAlign: "center", padding: 0 }}
                        >
                          عنوان
                        </CustomTableCell>

                        <CustomTableCell
                          style={{ textAlign: "center", padding: 4 }}
                        >
                          ویرایشگر
                        </CustomTableCell>

                        <CustomTableCell
                          style={{ textAlign: "center", padding: 4 }}
                        >
                          منتشرکننده
                        </CustomTableCell>

                        <CustomTableCell
                          style={{ textAlign: "center", padding: 4 }}
                        >
                          خبرنگار
                        </CustomTableCell>

                        <CustomTableCell
                          style={{ textAlign: "center", padding: 4 }}
                        >
                          وضعیت
                        </CustomTableCell>

                        <CustomTableCell
                          style={{ textAlign: "center", padding: 4 }}
                        >
                          تاریخ
                        </CustomTableCell>

                        <CustomTableCell style={{ textAlign: "right" }}>
                          {this.props.user.type !== 3 ? "ویرایش" : void 0}
                        </CustomTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {console.log("news", this.props.news)}
                      {this.props.news
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
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
                            >
                              <TableCell
                                // padding="checkbox"
                                style={{
                                  textAlign: "right",
                                  padding: "0"
                                }}
                              >
                                <Checkbox
                                  checked={isSelected}
                                  style={{
                                    color: "#1daced",
                                    display:
                                      this.props.user.type !== 3
                                        ? "inline-flex"
                                        : "none"
                                  }}
                                />
                              </TableCell>
                              <CustomTableCell
                                component="th"
                                scope="row"
                                style={{
                                  textAlign: "right",
                                  padding: 0
                                }}
                              >
                                {n.row}
                              </CustomTableCell>

                              <CustomTableCell
                                numeric
                                style={{ textAlign: "right", padding: 0 }}
                              >
                                <Card style={{ width: 60, height: 60 }}>
                                  <CardMedia
                                    style={{ width: 60, height: 60 }}
                                    image={n.testImage}
                                    title={n.type ? n.type.name : void 0}
                                  />
                                </Card>
                              </CustomTableCell>

                              <CustomTableCell
                                numeric
                                style={{ textAlign: "right", padding: 0 }}
                              >
                                {n.category !== null
                                  ? n.category.name
                                  : "نامشخص"}
                              </CustomTableCell>
                              <CustomTableCell
                                numeric
                                style={{ textAlign: "center", padding: 0 }}
                              >
                                {n.title}
                              </CustomTableCell>

                              <CustomTableCell
                                numeric
                                style={{ textAlign: "right", padding: 4 }}
                              >
                                {n.editor !== null ? n.editor.name : "نامشخص"}
                              </CustomTableCell>
                              <CustomTableCell
                                numeric
                                style={{ textAlign: "right", padding: 4 }}
                              >
                                {n.publisher !== null
                                  ? n.publisher.name
                                  : "نامشخص"}
                              </CustomTableCell>
                              <CustomTableCell
                                numeric
                                style={{ textAlign: "right", padding: 4 }}
                              >
                                {n.user !== null ? n.user.name : "نامشخص"}
                              </CustomTableCell>

                              <CustomTableCell
                                numeric
                                style={{
                                  textAlign: "right",
                                  padding: 4
                                }}
                              >
                                {n.statusText}
                              </CustomTableCell>

                              <CustomTableCell
                                numeric
                                style={{ textAlign: "right", padding: 4 }}
                              >
                                {n.updatedAt}
                              </CustomTableCell>

                              <CustomTableCell
                                numeric
                                style={{ textAlign: "center", padding: 0 }}
                              >
                                <IconButton
                                  aria-label="edit"
                                  style={{
                                    display:
                                      this.props.user.type !== 3
                                        ? "inline-flex"
                                        : "none"
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                              </CustomTableCell>
                            </TableRow>
                          );
                        })}
                      {/* {emptyRows > 0 && (
                        <TableRow style={{ emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )} */}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          colSpan={3}
                          count={this.props.news.length}
                          rowsPerPage={rowsPerPage}
                          labelDisplayedRows={({ from, to, count }) =>
                            from + "-" + to + "از " + count
                          }
                          labelRowsPerPage=""
                          page={page}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActionsWrapped}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      component = (
        <div style={{ marginTop: "15%" }}>
          <Grid container justify="center" alignItems="center">
            {USERS}
          </Grid>

          <p
            style={{ fontSize: ".8rem", color: "#999999", textAlign: "center" }}
          >
            لیست خالی است
          </p>
        </div>
      );
    }
    return component;
  };
}

export default withStyles(styles)(
  connect(state => {
    return {
      user: state.user
    };
  })(NewsUI)
);
