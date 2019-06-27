import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import Grid from "@material-ui/core/Grid";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, IndexLink } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ItookApi from "api/ItookApi";
import { browserHistory } from "react-router";
import * as actions from "redux/actions/actions";

import {
  HomeIcon,
  // SendMessage,
  // Inbox,
  Users,
  Access,
  User,
  Categpry,
  Reports,
  Advertise,
  // ManagementUsers,
  DriversManagement,
  Help,
  MenuUp,
  MenuDown,
  Finance,
  // Profile,
  Messages,
  SendMessage,
  Inbox,
  Setting,
  LogOut,
  Subject,
  Group,
  Spinner,
  Shipping,
  PageLayout,
  Profile,
  Orders,
  Comments,
  BasicInfo,
  Notification,
  FAQ,
  AboutUs,
  Blog,
  Discount,
  News,
  DiscountManage,
  PopUp
  // ArrowLeft
} from "components/Icons";

const drawerWidth = 240;
// const useStyles = makeStyles(theme => ({
//   margin: {
//     margin: theme.spacing(2),
//     marginRight: theme.spacing(3)
//   }
// }));

const styles = theme => ({
  root: {
    flexGrow: 1,
    // height: 430,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    // display: "flex",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "block"
    }
  },
  menuItem: {
    fontFamily: "iransans",
    fontSize: ".9rem",
    "&:focus": {
      backgroundColor: "#000",
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  ListItemText: {
    textAlign: "right",
    fontFamily: "iransans",
    fontSize: ".9rem"
  },
  primary: {
    fontFamily: "iransans",
    fontSize: ".9rem"
  },
  secondary: {
    color: "#fff",
    fontFamily: "iransans",
    fontSize: ".9rem"
  },
  icon: {},
  appBar: {
    // position: "fixed",
    background: "#000",
    marginRight: drawerWidth,
    left: 0,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: 0
    }
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    display: "block",
    // position: "relative",
    right: 0,

    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      // position: "fixed"
    },
    [theme.breakpoints.down("sm")]: {
      right: 0
    },
    // height: "calc(200vh - 75px)",
    // position: "fixed",
    background: "#ce313a"
  },
  drawerHeader: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-end",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing.unit * 3,
    [theme.breakpoints.up("sm")]: {
      // width: `calc(100% - ${drawerWidth}px)`
    },
    paddingRight: "241px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "15px"
    }
  },
  nested: {
    paddingRight: theme.spacing.unit * 3
  }
});
class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingOut: false,
      openUsers: false,
      openMessages: false,
      openSetting: false,
      anchorEl: null,

      openFinance: false,
      snack: {
        open: false,
        snackbarMessage: ""
      }
    };
  }
  state = {
    mobileOpen: false,
    anchorEl: null
  };
  state = {};
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  handleUserClick = () => {
    this.setState({ openUsers: !this.state.openUsers });
  };
  handleMessagesClick = () => {
    this.setState({ openMessages: !this.state.openMessages });
  };

  handleSettingClick = () => {
    this.setState({ openSetting: !this.state.openSetting });
  };

  handleDiscountClick = () => {
    this.setState({ openDiscount: !this.state.openDiscount });
  };
  handleFirstPageClick = () => {
    this.setState({ openFirstPage: !this.state.openFirstPage });
  };

  handleProductClick = () => {
    this.setState({ openProducts: !this.state.openProducts });
  };
  handleFinanceClick = () => {
    this.setState({ openFinance: !this.state.openFinance });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  /**
   * @description : Dipatches an action to log out the user
   *
   * @author Ali Aryani
   */
  handleLogout = () => {
    this.setState({ isLoggingOut: true });
    ItookApi.logout(this.props.user.token).then(
      res => {
        this.setState({ isLoggingOut: false });
        if (res && res.status === 200) {
          // window.location = process.env.REACT_APP_DOMAIN;
          // window.location.reload(true);
          // document.cookie =
          //   "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          this.props.dispatch(actions.logout());

          browserHistory.push("/login");
        } else if (res && res.status && res.status === 500) {
          this.setState({
            busy: false,
            isSnackOpen: true,
            snackbarMessage: "خطا در برقراری با سرور"
          });
        } else {
          this.setState({
            busy: false,
            isSnackOpen: true,
            snackbarMessage: res.data.message
          });
        }
      },

      err => {
        process.env.NODE_ENV === "development"
          ? console.log("handleLogout() failed with error :", err)
          : void 0;

        this.setState({
          isSnackOpen: true,
          isLoggingOut: false,
          snackbarMessage: "خطا در انجام عملیات"
        });
      }
    );
  };
  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    console.log("user", this.props.user);
    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          {this.props.user &&
          this.props.user.user &&
          this.props.user.user.avatarPath &&
          this.props.user.user.avatarPath.lenght > 0 ? (
            <div style={{ position: "absolute", right: 32 }}>
              <Avatar
                // alt="Adelle Charles"
                src={this.props.user.user.avatarPath}
                style={{
                  position: "relative",
                  margin: "auto",
                  width: 48,
                  height: 48,
                  marginRight: 16,
                  marginLeft: 16
                  // cursor: "pointer"
                }}
              />
            </div>
          ) : (
            <Avatar
              // alt="Adelle Charles"
              // src="images/avatar.png"
              style={{
                position: "relative",
                margin: "auto",
                width: 48,
                height: 48,
                background: "#000",
                color: "#fff",

                marginRight: 16,
                marginLeft: 16, // cursor: "pointer",
                fontFamily: "iransans",
                fontSize: ".9rem"
              }}
            >
              {this.props.user && this.props.user.firstName
                ? this.props.user.firstName.substring(0, 1)
                : "ن"}
            </Avatar>
          )}
          <p style={{ color: "#fff", fontWeight: "bold" }}>
            {/* {this.props.user.firstName + " " + this.props.user.lastName} */}
            علی آریانی
          </p>
          <IconButton
            aria-label="More"
            aria-owns={anchorEl ? "long-menu" : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MenuDown style={{ left: 8 }} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            style={{ left: 8 }}
          >
            <Link
              to="/profile"
              style={{ textDecoration: "none" }}
              activeClassName="active"
              activeStyle={{ fontWeight: "bold" }}
            >
              <MenuItem>
                <ListItemIcon className={classes.icon}>
                  <Profile />
                </ListItemIcon>
                <ListItemText
                  className={classes.ListItemText}
                  classes={{ primary: classes.primary }}
                  inset
                  primary="پروفایل"
                  style={{
                    fontFamily: "iransans",
                    fontSize: ".9rem"
                  }}
                />
              </MenuItem>
            </Link>
            <MenuItem onClick={this.handleLogout}>
              <ListItemIcon className={classes.icon}>
                <LogOut />
              </ListItemIcon>
              <ListItemText
                className={classes.ListItemText}
                classes={{ primary: classes.primary }}
                inset
                primary="خروج"
              />
            </MenuItem>
          </Menu>
        </div>

        <Divider style={{ backgroundColor: "#fff", height: "2px" }} />
        <IndexLink
          to="/"
          style={{ textDecoration: "none" }}
          activeClassName="active"
          activeStyle={{ fontWeight: "bold", fontSize: 20 }}
        >
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.ListItemText}
              classes={{ primary: classes.secondary }}
              inset
              primary="خانه"
            />
          </MenuItem>
        </IndexLink>

        <Link
          to="/users"
          style={{ textDecoration: "none" }}
          activeClassName="active"
          activeStyle={{ fontWeight: "bold" }}
        >
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <Users />
            </ListItemIcon>
            <ListItemText
              className={classes.ListItemText}
              classes={{ primary: classes.secondary }}
              inset
              primary="کاربران"
            />
          </MenuItem>
        </Link>

        <Link
          to="/categories"
          style={{ textDecoration: "none" }}
          activeClassName="active"
          activeStyle={{ fontWeight: "bold" }}
        >
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <Categpry />
            </ListItemIcon>
            <ListItemText
              className={classes.ListItemText}
              classes={{ primary: classes.secondary }}
              inset
              primary="دسته بندی ها"
            />
          </MenuItem>
        </Link>

        <Link
          to="/news"
          style={{ textDecoration: "none" }}
          activeClassName="active"
          activeStyle={{ fontWeight: "bold" }}
        >
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <News />
            </ListItemIcon>
            <ListItemText
              className={classes.ListItemText}
              classes={{ primary: classes.secondary }}
              inset
              primary="اخبار"
            />
          </MenuItem>
        </Link>

        <Link
          to="/groups"
          style={{ textDecoration: "none" }}
          activeClassName="active"
          activeStyle={{ fontWeight: "bold" }}
        >
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <Group />
            </ListItemIcon>
            <ListItemText
              className={classes.ListItemText}
              classes={{ primary: classes.secondary }}
              inset
              primary="گروه‌ها"
            />
          </MenuItem>
        </Link>

        <Link
          to="/comments"
          style={{ textDecoration: "none" }}
          activeClassName="active"
          activeStyle={{ fontWeight: "bold" }}
        >
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <Comments />
            </ListItemIcon>
            <ListItemText
              className={classes.ListItemText}
              classes={{ primary: classes.secondary }}
              inset
              primary="نظرات"
            />
          </MenuItem>
        </Link>
        <Link
          to="/advertise"
          style={{ textDecoration: "none" }}
          activeClassName="active"
          activeStyle={{ fontWeight: "bold" }}
        >
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <Advertise />
            </ListItemIcon>
            <ListItemText
              className={classes.ListItemText}
              classes={{ primary: classes.secondary }}
              inset
              primary="تبلیغات"
            />
          </MenuItem>
        </Link>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <p
                  variant="title"
                  color="inherit"
                  noWrap
                  style={{
                    fontFamily: "iransans"
                    // fontSize: ".9rem"
                  }}
                >
                  {this.props.title}
                </p>
              </Grid>
              <Grid item xs={10}>
                <div
                  style={{
                    // position: "absolute",
                    // top: 8,
                    // left: 8,
                    direction: "ltr",
                    width: "100%"
                  }}
                >
                  <React.Fragment>
                    <Badge
                      style={{ margin: 8, marginRight: 12 }}
                      // className={classess.margin}
                      badgeContent={99}
                    >
                      <MailIcon />
                    </Badge>
                    <Badge
                      // className={classess.margin}
                      badgeContent={100}
                      style={{ margin: 8, marginRight: 12 }}
                    >
                      <Notification />
                    </Badge>
                  </React.Fragment>
                  {this.props.actionButtons.map(button => {
                    return (
                      <div
                        style={{ display: "inline-block" }}
                        key={Math.random()}
                      >
                        {button}
                      </div>
                    );
                  })}
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
            {this.renderHelperComponents()}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
  renderHelperComponents = () => {
    return (
      <div>
        <Dialog
          open={this.state.isLoggingOut}
          aria-labelledby="responsive-title"
          titleStyle={{
            fontFamily: "iransans",
            fontSize: ".9rem"
          }}
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{
                fontFamily: "iransans",
                fontSize: ".9rem",
                margin: "8px"
              }}
            >
              <CircularProgress size={48} />
              <p>درحال خروج</p>
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.isSnackOpen}
          message={this.state.snackbarMessage}
          style={{ textAlign: "center" }}
          ref="snackbar"
          autoHideDuration={3000}
          onClose={() => {
            this.setState({ isSnackOpen: false });
          }}
        />
      </div>
    );
  };
}

AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string,
  onMenuIconTouchTap: PropTypes.func,
  actionButtons: PropTypes.array
};

AppLayout.defaultProps = {
  title: "",
  actionButtons: []
};
export default withStyles(styles, { withTheme: true })(
  connect(state => {
    return {
      user: state.user
    };
  })(AppLayout)
);
