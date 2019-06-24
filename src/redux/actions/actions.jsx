// import ItookApi from "api/ItookApi";

/**
 * @description : Updates app state
 *
 * @author Ali Aryani
 *
 * @param updates (object) : An object containing new app state
 *
 * @return action object for appReducer
 */
export function updateApp(updates) {
  return {
    type: "UPDATE_APP",
    updates
  };
}

/**
 * @description : Restes all application states on app store
 *
 * @author Armin Eslami
 *
 * @return action object for appReducer
 */
export function resetApp() {
  return {
    type: "RESET_APP"
  };
}

/**
 * @description : Updates component styles on app store
 *
 * @author Ali Aryani
 *
 * @param name (string) : The component name to be updated
 * @param style (object) : Styles object
 *
 * @return action object for appReducer
 */

export function updateComponent(name, style) {
  return {
    type: "UPDATE_COMPONENT",
    name,
    style
  };
}

/**
 * @description : Resets all components style to the default
 *
 * @author Ali Aryani
 *
 * @return action object for appReducer
 */

export function resetComponents() {
  return {
    type: "RESET_COMPONENTS"
  };
}

/**
 * @description : Updates user related  data like id, username ...
 *
 * @author Ali Aryani
 *
 * @param userData (object) : An object containing user data
 *
 * @return action object for userReducer
 */
export function updateUser(userData) {
  return {
    type: "UPDATED_USER",
    userData
  };
}

/**
 * @description : Inserts user related  data like id, username ... and remove previous data
 *
 * @author Ali Aryani
 *
 * @param userData (object) : An object containing user data
 *
 * @return action object for userReducer
 */
export function insertUserData(userData) {
  return {
    type: "INSERT_USER_DATA",
    userData
  };
}

/**
 * @description : Creates an action object to clear user states
 *
 * @author Ali Aryani
 *
 * @return action object for userReducer
 */
export function logout() {
  return {
    type: "LOGOUT"
  };
}
