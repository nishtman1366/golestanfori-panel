/**
 * @description : This is the main ui for InboxUI component.
 *
 * @method rendeUI
 * @method render
 *
 * @author Ali Aryani
 * @since File available since Release 1.0.0
 * @version 1.0.0
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Edit, Warning, AddUserIcon, EditUser } from "components/Icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";

import Select from "@material-ui/core/Select";
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
    overflowX: "auto"
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
  }
});
class CommentsUI extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      page: 0,
      rowsPerPage: 10
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  isSelected = id => this.props.selected.indexOf(id) !== -1;

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  render() {
    return (
      <div>
        {this.renderUI()}
        {this.props.openedComment !== undefined ? (
          <div>{this.renderCommnetDialog()}</div>
        ) : null}
        {this.renderDeleteDialog()}
      </div>
    );
  }
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
            آیا از حذف نظر اطمینان دارید؟
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
              color: "#fff",

              fontFamily: "iransans",
              fontSize: ".9rem",
              background: "#f44336"
            }}
          >
            انصراف
          </Button>
          {this.props.busy ? (
            <CircularProgress size={30} />
          ) : (
            <Button
              onClick={this.props.OnDeleteComments}
              style={{
                color: "#fff",
                fontFamily: "iransans",
                fontSize: ".9rem",
                background: "#4caf50"
              }}
            >
              بلی
            </Button>
          )}
        </Grid>
      </Dialog>
    );
  };
  renderCommnetBodyDialog = () => {
    return (
      <div>
        <DialogContent>
          <DialogContentText
            id="delet"
            style={{
              fontFamily: "iransans",
              fontSize: "1rem",
              padding: "8px",
              color: "#000",
              fontWeight: "bold",
              textJustify: "center"
            }}
          >
            {this.props.openedComment ? this.props.openedComment.name : void 0}
          </DialogContentText>
          <Divider />
          <DialogContentText
            id="alert-dialog-description"
            style={{
              fontFamily: "iransans",
              fontSize: ".9rem",
              padding: "8px",
              textJustify: "center"
            }}
          >
            {this.props.openedComment.body}
          </DialogContentText>
        </DialogContent>
      </div>
    );
  };
  renderCommnetDialog = () => {
    const { fullScreen } = this.props;
    console.log("openedComment", this.props.OpenModal);
    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.OpenModal}
        // onClose={this.props.OnCloseModal}
        aria-labelledby="responsive-title"
      >
        {/* <DialogTitle id="delet" style={{ textAlign: "center" }}>
          <Warning />
        </DialogTitle> */}

        <DialogContent>{this.renderCommnetBodyDialog()}</DialogContent>
        <Grid
          container
          alignItems="center"
          justify="space-around"
          style={{ marginBottom: "8px", padding: 4 }}
        >
          <Button
            disabled={this.props.busy}
            onClick={this.props.OnCloseModal}
            style={{
              color: "#fff",
              fontFamily: "iransans",
              fontSize: ".9rem",
              background: "#f44336",
              margin: 4
            }}
          >
            بستن
          </Button>
          {this.props.openedComment.status === 0 ? (
            <div>
              {this.props.busy ? (
                <CircularProgress size={30} />
              ) : (
                <Button
                  onClick={this.props.OnConfirmComment}
                  style={{
                    color: "#fff",
                    fontFamily: "iransans",
                    fontSize: ".9rem",
                    background: "#4caf50",
                    margin: 4
                  }}
                >
                  تایید نظر
                </Button>
              )}
            </div>
          ) : (
            void 0
          )}
        </Grid>
      </Dialog>
    );
  };
  /**
   * @description : Renders some helper ui components
   *
   * @author Ali Aryani
   *
   * @return jsx elements
   */
  renderUI = () => {
    const { classes, numSelected, rowCount } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, this.props.comments.length - page * rowsPerPage);
    var rowNumber = 1;

    return (
      <Grid
        container
        className={classes.root}
        justify="center"
        alignItems="stretch"
      >
        <Grid item xs={11}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell style={{ textAlign: "right" }}>
                    {/* <Grid item xs={12} md={8}>
                      <InputLabel
                        htmlFor="type"
                        style={{
                          fontFamily: "iransans",
                          fontSize: ".9rem"
                        }}
                      >
                        وضعیت
                      </InputLabel>
                      <Select
                        value={this.props.statusType}
                        onChange={this.props.OnStatusTypeChange}
                        input={<Input id="type" />}
                      >
                        <MenuItem value={4}>همه</MenuItem>

                        <MenuItem value={1}>تایید شده</MenuItem>
                        <MenuItem value={0}>بررسی</MenuItem>
                      </Select>
                    </Grid> */}
                  </CustomTableCell>
                  <CustomTableCell style={{ textAlign: "right" }}>
                    ردیف
                  </CustomTableCell>

                  <CustomTableCell style={{ textAlign: "right" }}>
                    فرستنده
                  </CustomTableCell>
                  <CustomTableCell style={{ textAlign: "right" }}>
                    کد خبر
                  </CustomTableCell>
                  <CustomTableCell style={{ textAlign: "right" }}>
                    ایمیل
                  </CustomTableCell>
                  <CustomTableCell style={{ textAlign: "right" }}>
                    وضعیت
                  </CustomTableCell>

                  <CustomTableCell style={{ textAlign: "right" }}>
                    تاریخ
                  </CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.comments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);

                    return (
                      <TableRow
                        key={n.id}
                        className={classes.row}
                        hover
                        tabIndex={-1}
                        selected={isSelected}
                        onClick={event => this.props.OnClickRow(event, n.id)}
                      >
                        <TableCell
                          // padding="checkbox"
                          style={{
                            textAlign: "right"
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
                          {rowNumber++}
                        </CustomTableCell>
                        <CustomTableCell numeric style={{ textAlign: "right" }}>
                          {n.name}
                        </CustomTableCell>
                        <CustomTableCell style={{ textAlign: "right" }}>
                          {n.postId}
                        </CustomTableCell>
                        <CustomTableCell style={{ textAlign: "right" }}>
                          {n.email}
                        </CustomTableCell>
                        <CustomTableCell style={{ textAlign: "right" }}>
                          {n.statusText}
                        </CustomTableCell>

                        <CustomTableCell numeric style={{ textAlign: "right" }}>
                          {n.jData}
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={3}
                    count={this.props.comments.length}
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
          </Paper>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(
  connect(state => {
    return {
      user: state.user
    };
  })(CommentsUI)
);
