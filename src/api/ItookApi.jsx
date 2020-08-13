/**
* *************************
*           API
* *************************
*
* @description : This file presents a javascript api for communicating with server
*
* @author Ali Aryani

*
*/

import axios from "axios";
var API_URL = "http://golestanfori.ir/api";
// var API_URL = "http://192.168.0.1:8000/api";

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

var requestUrl = "https://reqres.in/api/users/1";
// var API_URL = "http://golestan-fori.itookis.com/api";

// var INVALID_DATA = {
//   status: "error",
//   code: 400,
//   message: "اطلاعات معتبر نمی‌باشند"
// };

var FATAL_ERROR = {
  status: "error",
  code: 500,
  message: "خطا در انجام عملیات"
};

var ItookApi = {
  parseError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      return error.response.data;
    } else if (
      error.request &&
      (error.request.response || error.request.data)
    ) {
      var err = error.request.response
        ? error.request.response
        : error.request.data;
      // The request was made but no response was received
      try {
        return JSON.parse(err);
      } catch (e) {
        return FATAL_ERROR;
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      return FATAL_ERROR;
    }
  },

  /**
   * @description : Starts login process by sending given username and password to the server
   *
   * @author Ali Aryani
   *
   * @param username (string)  : user's username
   * @param password (string)  : user's password
   *
   * @return server response as an object
   */
  login(username, password) {
    return axios
      .post(API_URL + "/login", { username, password })
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  loginByCookie(token) {
    return axios
      .get(API_URL + "/user", {
        headers: {
          Authorization: token
        }
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log("inja");
        console.log(error);
        return error;
      });
  },

  /**
   * @description : Sends a request to the server to clear user coockie
   *
   * @author Ali Aryani
   *
   * @return server response as object
   */
  logout(token) {
    console.log("token,", token);

    return axios
      .get(API_URL + "/logout", {
        headers: {
          Authorization: token
        }
      })
      .then(response => {
        console.log("Response : " + response);

        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch user profile
   *
   * @author Ali Aryani
   *
   * @return server response as object
   */
  fetchUserProfile() {
    return axios
      .get(API_URL + "/user")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch user profile
   *
   * @author Ali Aryani
   *
   * @return server response as object
   */
  updateUserProfile() {
    return axios
      .put(API_URL + "/user")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchTags() {
    return axios
      .get(API_URL + "/tags")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  newsPublish(id) {
    console.log("id", id);
    return axios
      .get(API_URL + "/posts/" + id + "/publish")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchContent() {
    return axios
      .get(API_URL + "/contents/categories")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchResumes() {
    return axios
      .get(API_URL + "/resume")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchCategoriesResume() {
    return axios
      .get(API_URL + "/resume/categories")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchEditResume(id) {
    console.log("id", id);

    return axios
      .get(API_URL + "/resume/" + id)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchEditContents(id) {
    console.log("id", id);

    return axios
      .get(API_URL + "/contents/" + id)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchCategries() {
    return axios
      .get(API_URL + "/categories")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchCategriesList() {
    return axios
      .get(API_URL + "/categories")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to add Category
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  addResumeCategries(category) {
    for (var pair of category.entries()) {
      console.log("forrrmmmm", pair[0] + ", " + pair[1]);
    }

    return axios
      .post(API_URL + "/resume/categories", category)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to add Category
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  addContentCategries(category) {
    for (var pair of category.entries()) {
      console.log("forrrmmmm", pair[0] + ", " + pair[1]);
    }

    return axios
      .post(API_URL + "/contents/categories", category)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },
  /**
   * @description : Sends a request to add Category
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  addCategries(category) {
    for (var pair of category.entries()) {
      console.log("forrrmmmm", pair[0] + ", " + pair[1]);
    }

    return axios
      .post(API_URL + "/categories", category)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : edit category data to databse
   *
   * @author Ali Aryani
   *
   * @return server response
   */
  EditResumeCategory(id, category) {
    console.log("id", id);
    for (var pair of category.entries()) {
      console.log("forrrmmmm", pair[0] + ", " + pair[1]);
    }

    return axios
      .post(API_URL + "/resume/categories/" + id, category)
      .then(response => {
        console.log(response);

        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : edit category data to databse
   *
   * @author Ali Aryani
   *
   * @return server response
   */
  EditContentCategory(id, category) {
    console.log("id", id);
    for (var pair of category.entries()) {
      console.log("forrrmmmm", pair[0] + ", " + pair[1]);
    }

    return axios
      .post(API_URL + "/contents/categories/" + id, category)
      .then(response => {
        console.log(response);

        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : edit category data to databse
   *
   * @author Ali Aryani
   *
   * @return server response
   */
  EditCategory(id, category) {
    console.log("id", id);
    for (var pair of category.entries()) {
      console.log("forrrmmmm", pair[0] + ", " + pair[1]);
    }

    return axios
      .post(API_URL + "/categories/" + id, category)
      .then(response => {
        console.log(response);

        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /** @description : Sends a request to the server to remove one or multiple users.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  removeResumeCategories(ids) {
    var params = { params: { ids } };
    console.log("IDs are : " + ids);
    return axios
      .delete(API_URL + "/resume/categories", params)
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /** @description : Sends a request to the server to remove one or multiple users.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  removeContentCategories(ids) {
    var params = { params: { ids } };
    console.log("IDs are : " + ids);
    return axios
      .delete(API_URL + "/contents/categories", params)
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /** @description : Sends a request to the server to remove one or multiple users.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  removeCategories(ids) {
    var params = { params: { ids } };
    console.log("IDs are : " + ids);
    return axios
      .delete(API_URL + "/categories", params)
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchAdvertise() {
    return axios
      .get(API_URL + "/advertisement")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchPosition() {
    return axios
      .get(API_URL + "/advertisement/positions")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to add Category
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  EditResume(id, resume) {
    for (var pair of resume.entries()) {
      console.log("forrrmmmm", pair[0] + ", " + pair[1]);
    }
    console.log("id", id);
    return axios
      .post(API_URL + "/resume/" + id, resume)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },
  /**
   * @description : Sends a request to add Category
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  EditContent(id, content) {
    for (var pair of content.entries()) {
      console.log("forrrmmmm", pair[0] + ", " + pair[1]);
    }
    console.log("id", id);
    return axios
      .post(API_URL + "/contents/" + id, content)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to add Category
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  addResume(resume) {
    for (var pair of resume.entries()) {
      console.log("forrrmmmm", pair[0] + ", " + pair[1]);
    }

    return axios
      .post(API_URL + "/resume", resume)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to add Category
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  addContent(content) {
    for (var pair of content.entries()) {
      console.log("forrrmmmm", pair[0] + ", " + pair[1]);
    }

    return axios
      .post(API_URL + "/contents", content)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to add Category
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  addNews(post) {
    for (var pair of post.entries()) {
      console.log("forrrmmmm", pair[0] + ", " + pair[1]);
    }

    return axios
      .post(API_URL + "/posts", post)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to add Category
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  addAdvertise(advertisement) {
    for (var pair of advertisement.entries()) {
      console.log("forrrmmmm", pair[0] + ", " + pair[1]);
    }

    return axios
      .post(API_URL + "/advertisement", advertisement)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : edit category data to databse
   *
   * @author Ali Aryani
   *
   * @return server response
   */
  editNews(id, news) {
    console.log("id", id);
    for (var pair of news.entries()) {
      console.log("forrrmmmm", pair[0] + ", " + pair[1]);
    }

    return axios
      .post(API_URL + "/posts/" + id, news)
      .then(response => {
        console.log(response);

        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : edit category data to databse
   *
   * @author Ali Aryani
   *
   * @return server response
   */
  EditAdvertise(id, advertisement) {
    console.log("id", id);
    for (var pair of advertisement.entries()) {
      console.log("forrrmmmm", pair[0] + ", " + pair[1]);
    }

    return axios
      .post(API_URL + "/advertisement/" + id, advertisement)
      .then(response => {
        console.log(response);

        return response;
      })
      .catch(error => {
        console.log(error.response);
        return error.response;
      });
  },

  /** @description : Sends a request to the server to remove one or multiple users.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  removeAdvertise(ids) {
    var params = { params: { ids } };
    console.log("IDs are : " + ids);
    return axios
      .delete(API_URL + "/advertisement", params)
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /** @description : Sends a request to the server to remove one or multiple users.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  removeNews(ids) {
    var params = { params: { ids } };
    console.log("IDs are : " + ids);
    return axios
      .delete(API_URL + "/posts", params)
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /** @description : Sends a request to the server to remove one or multiple users.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  removeResumes(ids) {
    var params = { params: { ids } };
    console.log("IDs are : " + ids);
    return axios
      .delete(API_URL + "/resume", params)
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /** @description : Sends a request to the server to remove one or multiple users.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  removeContents(ids) {
    var params = { params: { ids } };
    console.log("IDs are : " + ids);
    return axios
      .delete(API_URL + "/contents", params)
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch fetchMatchsConfigList from the server
   *
   * @author Ali Aryani
   *
   * @return server response as object
   */
  fetchNewsById(id) {
    return axios
      .get(API_URL + "/posts/" + id)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchPostType() {
    return axios
      .get(API_URL + "/postTypes")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchKhabarNegar() {
    return axios
      .get(API_URL + "/users/groups/3")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },
  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchVirastar() {
    return axios
      .get(API_URL + "/users/groups/4")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },
  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchPublisher() {
    return axios
      .get(API_URL + "/users/groups/2")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },
  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchPostCreateType() {
    return axios
      .get(API_URL + "/postCreateTypes")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchgroups() {
    return axios
      .get(API_URL + "/groups")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchPolls() {
    return axios
      .get(API_URL + "/polls")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  addPoll(poll) {
    console.log("poll", poll);

    return axios
      .post(API_URL + "/polls", poll)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  editPoll(id, poll) {
    console.log("id", id);
    console.log("poll", poll);
    return axios
      .put(API_URL + "/polls/" + id, poll)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /** @description : Sends a request to the server to remove one or multiple groups.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  removePoll(ids) {
    var params = { params: { ids } };
    console.log("IDs are : " + ids);
    return axios
      .delete(API_URL + "/polls", params)
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchPollResults(pollId, id) {
    console.log("pollId", pollId);
    console.log("id", id);

    return axios
      .get(API_URL + "/polls/" + pollId + "/viewResults/" + id)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchAnswers(pollId, id) {
    console.log("pollId", pollId);
    console.log("id", id);

    return axios
      .get(API_URL + "/polls/" + pollId + "/questions/" + id + "/answers")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  addAnswers(pollId, id, answers) {
    console.log("answers", answers);
    console.log("pollId", pollId);
    console.log("id", id);

    return axios
      .post(API_URL + "/polls/" + pollId + "/questions/" + id + "/answers", {
        answer: answers
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  editAnswers(pollId, id, answer) {
    console.log("id", id);
    console.log("answers", answer);
    console.log("pollId", pollId);

    return axios
      .put(
        API_URL +
          "/polls/" +
          pollId +
          "/questions/" +
          id +
          "/answers/" +
          answer.id,
        answer
      )
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /** @description : Sends a request to the server to remove one or multiple groups.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  removeAnswers(pollId, id, ids) {
    var params = { params: { ids } };
    console.log("IDs are : " + ids);
    return axios
      .delete(
        API_URL + "/polls/" + pollId + "/questions/" + id + "/answers",
        params
      )
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchQuestions(id) {
    return axios
      .get(API_URL + "/polls/" + id + "/questions")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchResults(id) {
    return axios
      .get(API_URL + "/polls/" + id)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  addQuestion(id, question) {
    console.log("question", question);

    return axios
      .post(API_URL + "/polls/" + id + "/questions", question)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  editQuestion(id, question) {
    console.log("id", id);
    console.log("question", question);
    console.log("questionid", question.id);

    return axios
      .put(API_URL + "/polls/" + id + "/questions/" + question.id, question)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /** @description : Sends a request to the server to remove one or multiple groups.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  removeQuestion(id, ids) {
    var params = { params: { ids } };
    console.log("IDs are : " + ids);
    return axios
      .delete(API_URL + "/polls/" + id + "/questions", params)
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to add group
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  addGroup(groups) {
    return axios
      .post(API_URL + "/groups", groups)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : edit groups data to databse
   *
   * @author Ali Aryani
   *
   * @return server response
   */
  EditGroup(id, name) {
    console.log("id", id);
    console.log("name", name);

    return axios
      .put(API_URL + "/groups/" + id, name)
      .then(response => {
        console.log(response);

        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch fetchMatchsConfigList from the server
   *
   * @author Ali Aryani
   *
   * @return server response as object
   */
  fetchGroupNews(id) {
    return axios
      .get(API_URL + "/posts/groups/" + id)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },
  /** @description : Sends a request to the server to remove one or multiple groups.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  removeGroup(ids) {
    var params = { params: { ids } };
    console.log("IDs are : " + ids);
    return axios
      .delete(API_URL + "/groups", params)
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /** @description : Sends a request to the server to remove one or multiple users.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  SetPermissions(type, id, ids) {
    var params = { ids };
    var url;
    if (type === "user") {
      url = "/users/" + id + "/permissions";
    } else if (type === "group") {
      url = "/users/groups/" + id + "/permissions";
    }

    console.log("IDs are : " + ids);
    console.log("id : " + id);

    return axios
      .post(API_URL + url, params)
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /** @description : Sends a request to the server to remove one or multiple users.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  removeGroupPosts(id, postIds) {
    var params = { params: { postIds } };
    console.log("IDs are : " + postIds);
    console.log("id : " + id);

    return axios
      .delete(API_URL + "/groups/" + id, params)
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /** @description : Sends a request to the server to remove one or multiple users.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  AddToGroup(id, postIds) {
    var params = { postIds };
    console.log("IDs are : " + postIds);
    console.log("id : " + id);

    return axios
      .post(API_URL + "/groups/" + id, params)
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchContents(url, filter) {
    var apiUrl = url === null ? API_URL + "/contents" : url;

    console.log("filter", filter);
    return axios
      .get(apiUrl, filter)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch Categries
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  fetchNews(url, filter) {
    var apiUrl = url === null ? API_URL + "/posts/list" : url;

    console.log("filter", filter);
    return axios
      .post(apiUrl, filter)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch fetchMatchsConfigList from the server
   *
   * @author Ali Aryani
   *
   * @return server response as object
   */
  fetchUsers(url, filter) {
    var apiUrl = url === null ? API_URL + "/users" : url;

    console.log("filter", filter);

    return axios
      .post(apiUrl, filter)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },
  /**
   * @description : Sends a request to fetch fetchMatchsConfigList from the server
   *
   * @author Ali Aryani
   *
   * @return server response as object
   */
  fetchGroupUsers() {
    return axios
      .get(API_URL + "/users/groups")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to add group
   *
   * @author Ali Aryani
   *
   * @return server response object
   */

  addUser(user) {
    console.log("user", user);
    return axios
      .post(API_URL + "/users/register", user)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },
  /**
   * @description : edit groups data to databse
   *
   * @author Ali Aryani
   *
   * @return server response
   */
  EditUser(id, user) {
    console.log("id", id);
    console.log("name", user);

    return axios
      .put(API_URL + "/users/" + id, user)
      .then(response => {
        console.log(response);

        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },
  /** @description : Sends a request to the server to remove one or multiple users.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  removeUser(ids) {
    var params = { params: { ids } };
    console.log("IDs are : " + ids);

    return axios
      .delete(API_URL + "/users", params)
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch fetchMatchsConfigList from the server
   *
   * @author Ali Aryani
   *
   * @return server response as object
   */
  fetchComments(id) {
    console.log("id", id);
    var url;
    if (id !== undefined) {
      url = "/posts/" + id + "/comments";
    } else {
      url = "/comments";
    }
    return axios
      .get(API_URL + url)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },
  /**
   * @description : Sends a request to fetch fetchMatchsConfigList from the server
   *
   * @author Ali Aryani
   *
   * @return server response as object
   */
  EditComment(id) {
    return axios
      .put(API_URL + "/comments/" + id)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },
  /** @description : Sends a request to the server to remove one or multiple users.
   *
   * @author Ali Aryani
   *
   * @param ids (array) : Messages ids to be removed
   *
   * @return server response as object
   */
  removeComments(ids) {
    var params = { params: { ids } };
    console.log("IDs are : " + ids);

    return axios
      .delete(API_URL + "/comments", params)
      .then(response => {
        console.log("Response : " + response);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },
  /**
   * @description : Sends a request to fetch fetchMatchsConfigList from the server
   *
   * @author Ali Aryani
   *
   * @return server response as object
   */
  fetchAccessGroups() {
    return axios
      .get(API_URL + "/users/groups")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  },

  /**
   * @description : Sends a request to fetch fetchMatchsConfigList from the server
   *
   * @author Ali Aryani
   *
   * @return server response as object
   */
  fetchGroupAcces(type, id) {
    console.log("type", type);
    console.log("id", id);

    var url;
    if (type === "user") {
      url = "/users/" + id + "/permissions";
    } else if (type === "group") {
      url = "/users/groups/" + id + "/permissions";
    }
    return axios
      .get(API_URL + url)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        return error.response;
      });
  }
}; //end of api
export default ItookApi;
