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
import DialogActions from "@material-ui/core/DialogActions";
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
  AddUserIcon,
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
    marginTop: theme.spacing(3),
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
class UsersUI extends Component {
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
        {this.renderFabButton()}
        {this.renderAddDialog()}
        {this.props.openedUser !== undefined ? (
          <div>{this.renderEditDialog()}</div>
        ) : null}
        {this.renderDeleteDialog()}
      </div>
    );
  }
  isSelected = id => this.props.selected.indexOf(id) !== -1;

  renderAddDialogBody = () => {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel
                htmlFor="type"
                style={{
                  fontFamily: "iransans",
                  fontSize: ".9rem"
                }}
              >
                سمت
              </InputLabel>
              <Select
                autoFocus
                value={this.props.person.groupId}
                // error={this.props.errors.type.length > 0}
                formhelpertext={this.props.errors.type}
                onChange={this.props.OnTypeChange}
                input={<Input id="type" />}
              >
                {this.props.GroupUsers
                  ? this.props.GroupUsers.map(n => {
                      return (
                        <MenuItem
                          value={n.id}
                          key={n.id}
                          style={{
                            fontFamily: "iransans",
                            fontSize: ".9rem"
                          }}
                        >
                          {n.displayName}
                        </MenuItem>
                      );
                    })
                  : void 0}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              error={this.props.errors.firstName}
              helperText={this.props.errors.firstName}
              required
              id="required"
              label="نام"
              value={this.props.person.firstName}
              onChange={e => {
                this.props.onFormDataChange("firstName", e.target.value);
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

          <Grid item xs={12} md={6}>
            <TextField
              error={this.props.errors.lastName}
              helperText={this.props.errors.lastName}
              required
              id="required"
              label="نام خانوادگی"
              InputLabelProps={{
                className: classes.textFieldFormLabel
              }}
              InputProps={{
                className: classes.textFieldForm
              }}
              value={this.props.person.lastName}
              onChange={e => {
                this.props.onFormDataChange("lastName", e.target.value);
              }}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              error={this.props.errors.username}
              helperText={this.props.errors.username}
              required
              id="required"
              label="نام کاربری"
              InputLabelProps={{
                className: classes.textFieldFormLabel
              }}
              InputProps={{
                className: classes.textFieldForm
              }}
              value={this.props.person.username}
              onChange={e => {
                this.props.onFormDataChange("username", e.target.value);
              }}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              error={this.props.errors.password}
              helperText={this.props.errors.password}
              required
              label="رمز عبور"
              id="required"
              type="password"
              value={this.props.person.password}
              onChange={e => {
                this.props.onFormDataChange("password", e.target.value);
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
          <Grid item xs={12} md={6}>
            <TextField
              error={this.props.errors.mobile}
              helperText={this.props.errors.mobile}
              required
              id="required"
              label="تلفن همراه"
              InputLabelProps={{
                className: classes.textFieldFormLabel
              }}
              InputProps={{
                className: classes.textFieldForm
              }}
              type="number"
              value={this.props.person.mobile}
              onChange={e => {
                this.props.onFormDataChange("mobile", e.target.value);
              }}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              error={this.props.errors.email}
              helperText={this.props.errors.email}
              required
              id="required"
              label="ایمیل"
              InputLabelProps={{
                className: classes.textFieldFormLabel
              }}
              InputProps={{
                className: classes.textFieldForm
              }}
              type="test"
              value={this.props.person.email}
              onChange={e => {
                this.props.onFormDataChange("email", e.target.value);
              }}
              margin="normal"
            />
          </Grid>

          <button type="submit" hidden />
        </Grid>
      </div>
    );
  };

  renderEditDialogBody = () => {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel
                htmlFor="type"
                style={{
                  fontFamily: "iransans",
                  fontSize: ".9rem"
                }}
              >
                سمت
              </InputLabel>
              <Select
                autoFocus
                value={this.props.openedUser.groupId}
                // error={this.props.errors.type.length > 0}
                formhelpertext={this.props.errors.type}
                onChange={this.props.OnTypeChange}
                input={<Input id="type" />}
              >
                {this.props.GroupUsers
                  ? this.props.GroupUsers.map(n => {
                      return (
                        <MenuItem
                          value={n.id}
                          key={n.id}
                          style={{
                            fontFamily: "iransans",
                            fontSize: ".9rem"
                          }}
                        >
                          {n.displayName}
                        </MenuItem>
                      );
                    })
                  : void 0}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              error={this.props.errors.firstName}
              helperText={this.props.errors.firstName}
              required
              id="required"
              label="نام"
              value={this.props.openedUser.firstName}
              onChange={e => {
                this.props.OnEditFormDataChange("firstName", e.target.value);
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

          <Grid item xs={12} md={6}>
            <TextField
              error={this.props.errors.lastName}
              helperText={this.props.errors.lastName}
              required
              id="required"
              label="نام خانوادگی"
              InputLabelProps={{
                className: classes.textFieldFormLabel
              }}
              InputProps={{
                className: classes.textFieldForm
              }}
              value={this.props.openedUser.lastName}
              onChange={e => {
                this.props.OnEditFormDataChange("lastName", e.target.value);
              }}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              error={this.props.errors.username}
              helperText={this.props.errors.username}
              required
              id="required"
              label="نام کاربری"
              InputLabelProps={{
                className: classes.textFieldFormLabel
              }}
              InputProps={{
                className: classes.textFieldForm
              }}
              value={this.props.openedUser.username}
              onChange={e => {
                this.props.OnEditFormDataChange("username", e.target.value);
              }}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              error={this.props.errors.password}
              helperText={this.props.errors.password}
              required
              label="رمز عبور"
              id="required"
              type="password"
              value={this.props.openedUser.password}
              onChange={e => {
                this.props.OnEditFormDataChange("password", e.target.value);
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
          <Grid item xs={12} md={6}>
            <TextField
              error={this.props.errors.mobile}
              helperText={this.props.errors.mobile}
              required
              id="required"
              label="تلفن همراه"
              InputLabelProps={{
                className: classes.textFieldFormLabel
              }}
              InputProps={{
                className: classes.textFieldForm
              }}
              type="number"
              value={this.props.openedUser.mobile}
              onChange={e => {
                this.props.OnEditFormDataChange("mobile", e.target.value);
              }}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              error={this.props.errors.email}
              helperText={this.props.errors.email}
              required
              id="required"
              label="ایمیل"
              InputLabelProps={{
                className: classes.textFieldFormLabel
              }}
              InputProps={{
                className: classes.textFieldForm
              }}
              type="test"
              value={this.props.openedUser.email}
              onChange={e => {
                this.props.OnEditFormDataChange("email", e.target.value);
              }}
              margin="normal"
            />
          </Grid>

          <button type="submit" hidden />
        </Grid>
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
          <AddUserIcon />
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
              onClick={this.props.OnAddUser}
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
                onClick={this.props.OnEditUser}
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
              onClick={this.props.OnDeleteUser}
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
                          نام
                        </CustomTableCell>
                        <CustomTableCell style={{ textAlign: "right" }}>
                          نام کاربری
                        </CustomTableCell>
                        <CustomTableCell style={{ textAlign: "right" }}>
                          موبایل
                        </CustomTableCell>
                        <CustomTableCell style={{ textAlign: "right" }}>
                          ایمیل
                        </CustomTableCell>
                        <CustomTableCell style={{ textAlign: "right" }}>
                          سمت
                        </CustomTableCell>

                        <CustomTableCell style={{ textAlign: "right" }}>
                          ویرایش
                        </CustomTableCell>
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
                                {n.row}
                              </CustomTableCell>

                              <CustomTableCell
                                numeric
                                style={{ textAlign: "right", padding: "0" }}
                              >
                                {n.name}
                              </CustomTableCell>
                              <CustomTableCell
                                numeric
                                style={{ textAlign: "right", padding: "0" }}
                              >
                                {n.username}
                              </CustomTableCell>
                              <CustomTableCell
                                numeric
                                style={{ textAlign: "right", padding: "0" }}
                              >
                                {n.mobile}
                              </CustomTableCell>
                              <CustomTableCell
                                numeric
                                style={{ textAlign: "right", padding: "0" }}
                              >
                                {n.email}
                              </CustomTableCell>
                              <CustomTableCell
                                numeric
                                style={{ textAlign: "center", padding: "0" }}
                              >
                                {n.groupText}
                              </CustomTableCell>

                              <CustomTableCell
                                numeric
                                style={{ textAlign: "right" }}
                              >
                                <IconButton
                                  aria-label="edit"
                                  style={{
                                    display: "inline-flex"
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
            لیست کاربران ها خالی است
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
  })(UsersUI)
);
