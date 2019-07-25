import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
// import injectTapEventPlugin from "react-tap-event-plugin";
import { Route, Router, IndexRoute, browserHistory } from "react-router";
import Loadable from "react-loadable";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import registerServiceWorker from "./registerServiceWorker";
import Loading from "./containers/Loading";

import { updateApp } from "./redux/actions/actions";
var store = require("./redux/store/configStore").config();

const Main = Loadable({
  loader: () => import("./containers/Main"),
  loading: Loading
});
const Login = Loadable({
  loader: () => import("./containers/login/Login"),
  loading: Loading
});
const Home = Loadable({
  loader: () => import("./containers/home/Home"),
  loading: Loading
});

const Categories = Loadable({
  loader: () => import("./containers/categories/Categories"),
  loading: Loading
});

const News = Loadable({
  loader: () => import("./containers/news/News"),
  loading: Loading
});

const AddNews = Loadable({
  loader: () => import("./containers/news/AddNews"),
  loading: Loading
});

const EditNews = Loadable({
  loader: () => import("./containers/news/EditNews"),
  loading: Loading
});

const Groups = Loadable({
  loader: () => import("./containers/groups/Groups"),
  loading: Loading
});

const GroupPosts = Loadable({
  loader: () => import("./containers/groups/GroupPosts"),
  loading: Loading
});

const Poll = Loadable({
  loader: () => import("./containers/poll/Poll"),
  loading: Loading
});

const Questions = Loadable({
  loader: () => import("./containers/poll/Questions"),
  loading: Loading
});

const Users = Loadable({
  loader: () => import("./containers/users/Users"),
  loading: Loading
});

const Comments = Loadable({
  loader: () => import("./containers/comments/Comments"),
  loading: Loading
});

const Profile = Loadable({
  loader: () => import("./containers/profile/Profile"),
  loading: Loading
});
const Advertise = Loadable({
  loader: () => import("./containers/advertise/Advertise"),
  loading: Loading
});

const Acces = Loadable({
  loader: () => import("./containers/acces/Groups"),
  loading: Loading
});

const UserAcces = Loadable({
  loader: () => import("./containers/acces/UserAcces"),
  loading: Loading
});

const theme = createMuiTheme({
  direction: "rtl",
  fontFamily: "iransans",
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#000",
      contrastText: "#fff",
      fontFamily: "iransans",
      fontSize: ".9rem"

      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contast with palette.primary.main
    },
    secondary: {
      light: "#9c27b0",
      main: "#9c27b0",
      fontFamily: "iransans",
      fontSize: ".9rem",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#fafafa"
    }
    // error: will use the default color
  },
  overrides: {
    MuiFormControlLabel: {
      // Name of the component ⚛️ / style sheet
      label: {
        fontFamily: "iransans",
        fontSize: ".9rem"
      }
    },
    MuiListItemText: {
      primary: {
        fontFamily: "iransans"
      }
    },
    MuiExpansionPanelSummary: {
      expandIcon: {
        left: 8,
        right: "auto"
      }
    },
    MuiTypography: {
      body: {
        fontFamily: "iransans",
        fontSize: ".9rem"
      }
    }
  }
});

var state;

var activeComponent = browserHistory.getCurrentLocation().pathname;

store.dispatch(updateApp({ activeComponent }));

store.subscribe(() => {
  state = store.getState();
  activeComponent = state.app.activeComponent;
  process.env.NODE_ENV === "development"
    ? console.log("New State", state)
    : void 0;

  //If user state exist and user is logged in, then redirect to the the main path or current active component
  if (state.user && state.user.isLoggedIn) {
    if (browserHistory.getCurrentLocation().pathname === "/login") {
      if (activeComponent === "/login" || activeComponent === null) {
        browserHistory.replace("/");
      } else {
        browserHistory.replace(activeComponent);
      }
    }
  } else if (
    state.user &&
    !state.user.isLoggedIn &&
    browserHistory.getCurrentLocation().pathname !== "/login"
  ) {
    // If user is not logged in and also is not at login route, then redirect to the login route
    browserHistory.replace("/login");
  }
});

function redirectIfLoggedIn(nextState, replace, next) {
  state = store.getState();
  if (state.user && state.user.isLoggedIn) {
    replace("/");
  }
  next();
}
browserHistory.listen(function(ev) {
  // (ev.hash).slice(2) return route name too
  if (browserHistory.getCurrentLocation().pathname !== "/login") {
    activeComponent = browserHistory.getCurrentLocation().pathname;
    store.dispatch(updateApp({ activeComponent }));
  }
});
// injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="login" component={Login} onEnter={redirectIfLoggedIn} />

        <Route path="/" component={Main}>
          <IndexRoute component={Home} />

          <Route path="categories" component={Categories} />
          <Route path="news" component={News} />
          <Route path="addNews" component={AddNews} />
          <Route path="editNews/:id" component={EditNews} />

          <Route path="groups" component={Groups} />
          <Route path="users" component={Users} />
          <Route path="comments" component={Comments} />
          <Route path="poll" component={Poll} />
          <Route path="poll/:id/questions" component={Questions} />

          <Route path="editNews/:id/comments" component={Comments} />

          <Route path="profile" component={Profile} />

          <Route path="advertise" component={Advertise} />
          <Route path="acces" component={Acces} />
          <Route path="permissions/:type/:id/acces" component={UserAcces} />

          <Route path="Groups/:id/posts" component={GroupPosts} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
