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
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
import { Edit, Warning, AddCategory, Tik } from "components/Icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import jMoment from "moment-jalaali";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

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
  dialogPaper: {
    maxHeight: "500px",
    width: "700px"
  }
});
class UserAccesUI extends Component {
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

  render() {
    console.log("this.props.selected", this.props.selected);
    return <div style={{ marginTop: 24 }}>{this.renderUI()}</div>;
  }
  isSelected = id => this.props.selected.indexOf(id) !== -1;

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
              onClick={this.props.OnDeleteGroupPosts}
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

  renderUI = () => {
    console.log("pagein");

    const { classes } = this.props;

    var component;
    if (this.props.permissions.length > 0) {
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
                <p style={{ marginRight: 8, color: "#2196F3" }}>
                  دسترسی‌هایی که غیر فعال می باشند، مربوط به گروه یا گروه‌های
                  کاربری دیگری می‌باشند .
                </p>
                <Grid container>
                  {this.props.permissions.map(n => {
                    const isSelected = this.isSelected(n.id);

                    return (
                      <Grid
                        item
                        xs={6}
                        md={3}
                        selected={isSelected}
                        key={n.id}
                        onClick={event => this.props.OnClick(event, n.id)}
                      >
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
                                checked={isSelected}
                                disabled={n.disable}
                                // checked={n.allow}
                                value={n.allow}
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
                            {n.name}
                          </span>
                        </div>
                      </Grid>
                    );
                  })}
                  {/* {emptyRows > 0 && (
                        <TableRow style={{ emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )} */}
                </Grid>
                <div style={{ textAlign: "center", padding: 16 }}>
                  {this.props.user.permissions["edit-users-groups"] === true ? (
                    <Button
                      onClick={this.props.onSetPermissions}
                      style={{
                        color: "#fff",

                        fontFamily: "iransans",
                        fontSize: ".9rem",
                        background: "#2196F3"
                      }}
                    >
                      تایید
                      <Tik style={{ marginRight: 8 }} />
                    </Button>
                  ) : (
                    void 0
                  )}
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
  })(UserAccesUI)
);
