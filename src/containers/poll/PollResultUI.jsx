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
import TextField from "@material-ui/core/TextField";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import FormHelperText from "@material-ui/core/FormHelperText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { USERS } from "components/StatesIcons";
import {
  Edit,
  Warning,
  AddCategory,
  EditUser,
  Enseraf,
  Tik
} from "components/Icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#2196F3",
    color: "#fff",
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
    marginTop: theme.spacing(1),
    overflowX: "auto",
    fontFamily: "iransans"
  },
  table: {
    width: "100%"
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
    margin: theme.spacing(1),
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
  },
  dialogPaper: {
    maxHeight: "500px",
    width: "400px"
  }
});
class PollResultUI extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      page: 0,
      rowsPerPage: 10
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
      <div>
        {this.renderUI()}
        {/* {this.props.user.permissions["write-groups"] === true
          ? this.renderFabButton()
          : void 0} */}
        {/* {this.renderAddDialog()} */}
        {/* {this.props.openedAnswers !== undefined ? (
          <div>{this.renderEditDialog()}</div>
        ) : null} */}
        {/* {this.renderDeleteDialog()} */}
      </div>
    );
  }
  isSelected = id => this.props.selected.indexOf(id) !== -1;

  renderAddDialogBody = () => {
    const { classes } = this.props;

    return (
      <div>
        <form onSubmit={this.props.OnAddAnswers}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={12} md={12}>
              <TextField
                error={this.props.errors.answers}
                helperText={this.props.errors.answers}
                required
                id="required"
                label="جواب"
                defaultValue={this.props.answers}
                onChange={e => {
                  this.props.onAnswersChange(e.target.value);
                }}
                InputLabelProps={{
                  className: classes.textFieldFormLabel
                }}
                fullWidth
                InputProps={{
                  className: classes.textFieldForm
                }}
                margin="normal"
              />
            </Grid>
          </Grid>

          <button type="submit" hidden />
        </form>
      </div>
    );
  };

  renderEditDialogBody = () => {
    const { classes } = this.props;

    return (
      <div>
        <form onSubmit={this.props.OnEditAnswers}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={12} md={12}>
              <TextField
                error={this.props.errors.answers}
                helperText={this.props.errors.answers}
                required
                id="required"
                label="جواب"
                defaultValue={this.props.openedAnswers.answer}
                onChange={e => {
                  this.props.onEditAnswersChange(e.target.value);
                }}
                InputLabelProps={{
                  className: classes.textFieldFormLabel
                }}
                fullWidth
                InputProps={{
                  className: classes.textFieldForm
                }}
                margin="normal"
              />
            </Grid>
          </Grid>

          <button type="submit" hidden />
        </form>
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
  renderAddDialog = () => {
    const { classes } = this.props;

    return (
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        // fullScreen={fullScreen}
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
              onClick={this.props.OnAddAnswers}
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

  renderEditDialog = () => {
    const { classes } = this.props;

    return (
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={this.props.OpenEditModal}
        // onClose={this.props.OnCloseEdit}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="edit" style={{ textAlign: "center" }}>
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
            onClick={this.props.OnCloseEdit}
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

          <div>
            {this.props.busy ? (
              <CircularProgress size={30} />
            ) : (
              <Button
                onClick={this.props.OnEditAnswers}
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
          </div>
        </Grid>
      </Dialog>
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
              onClick={this.props.OnDeleteAnswers}
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
  renderFabButton = () => {
    const { classes } = this.props;

    return (
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
  renderUI = () => {
    console.log("pagein");
    const { onSelectAllClick, numSelected, rowCount } = this.props;

    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, this.props.data.length - page * rowsPerPage);

    var component;
    if (this.props.data.length > 0) {
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
                        <CustomTableCell style={{ textAlign: "right" }}>
                          <Checkbox
                            style={{
                              color: "#1daced",
                              display: "none"
                            }}
                          />
                        </CustomTableCell>
                        <CustomTableCell style={{ textAlign: "right" }}>
                          ردیف
                        </CustomTableCell>
                        <CustomTableCell style={{ textAlign: "right" }}>
                          سوال
                        </CustomTableCell>

                        <CustomTableCell style={{ textAlign: "right" }}>
                          جواب
                        </CustomTableCell>
                        {/* <CustomTableCell style={{ textAlign: "right" }}>
                          نوع سوال
                        </CustomTableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {console.log("data", this.props.data)}
                      {this.props.data
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
                                  disabled
                                  checked={isSelected}
                                  style={{
                                    color: "#1daced",
                                    display:
                                      this.props.user.permissions[
                                        "delete-groups"
                                      ] === false
                                        ? "none"
                                        : "inline-flex"
                                  }}
                                />
                              </TableCell>
                              <CustomTableCell
                                component="th"
                                scope="row"
                                style={{ textAlign: "right" }}
                              >
                                {n.row}
                              </CustomTableCell>

                              <CustomTableCell
                                numeric
                                style={{ textAlign: "right", padding: "0" }}
                              >
                                {n.question}
                              </CustomTableCell>

                              <CustomTableCell
                                numeric
                                style={{ textAlign: "right", padding: "0" }}
                              >
                                {n.answer}
                              </CustomTableCell>
                              {/* <CustomTableCell
                                numeric
                                style={{ textAlign: "right" }}
                              >
                                {n.type === "SELECT" ? "انتخابی" : "تشریحی"}
                              </CustomTableCell> */}

                              {/* <CustomTableCell
                                numeric
                                style={{ textAlign: "right" }}
                              >
                                <IconButton
                                  aria-label="edit"
                                  style={{
                                    display:
                                      this.props.user.permissions[
                                        "edit-groups"
                                      ] === false
                                        ? "none"
                                        : "inline-flex"
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                              </CustomTableCell> */}
                            </TableRow>
                          );
                        })}
                      {/* {emptyRows > 0 && (
                        <TableRow style={{ emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )} */}
                    </TableBody>
                    <TableFooter style={{ direction: "ltr" }}>
                      <TableRow>
                        <TablePagination
                          colSpan={3}
                          count={this.props.data.length}
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
            لیست نتایج خالی است
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
  })(PollResultUI)
);
