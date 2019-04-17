import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";
import * as categories from "./categories";
import * as posts from "./posts";
import * as flags from "./flags";
import * as comments from "./comments";

export default combineReducers({
  ...categories,
  ...comments,
  ...flags,
  ...posts,
  loadingBar: loadingBarReducer
});
