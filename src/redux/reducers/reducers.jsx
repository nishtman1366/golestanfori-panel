var defaultAppState = {
  activeComponent: null,
  isDrawerOpen: undefined,
  fetchLimit: 10,
  windowWidth: null
};

export function appReducer(state = defaultAppState, action) {
  switch (action.type) {
    case "UPDATE_APP":
      return {
        ...state,
        ...action.updates
      };

    case "UPDATE_COMPONENT":
      return {
        ...state,
        components: {
          ...state.components,
          [action.name]: {
            ...state.components[action.name],
            ...action.style
          }
        }
      };

    case "RESET_APP":
      return defaultAppState;

    case "RESET_COMPONENTS":
      return {
        ...state,
        components: defaultAppState.components
      };

    case "LOGOUT":
      return defaultAppState;

    default:
      return state;
  }
}

var defaultUserState = {
  token: null,
  isLoggedIn: false
};

export function userReducer(state = defaultUserState, action) {
  switch (action.type) {
    case "UPDATED_USER":
      return {
        ...state,
        ...action.userData
      };

    case "INSERT_USER_DATA":
      return {
        ...action.userData
      };

    case "LOGOUT":
      return defaultUserState;

    default:
      return state;
  }
}
