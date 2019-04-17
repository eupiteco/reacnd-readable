import { getInitialData } from "../utils/ReadableAPI";
import { receivePosts } from "./posts.js";
import { receiveCategories } from "./categories.js";
import { showLoading, hideLoading } from "react-redux-loading";

export const SET_AUTHED_USER = "SET_AUTHED_USER";

const authedId = "eupiteco";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ posts, categories }) => {
      dispatch(receiveCategories(categories));
      dispatch(receivePosts(posts));
      dispatch(setAuthedUser(authedId));
      dispatch(hideLoading());
    });
  };
}

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  };
}
