import { SORT_POSTS } from "../actions/posts";
import { SET_AUTHED_USER } from "../actions/shared";

export function flags(state = { sortBy: "score", authedUser: null }, action) {
  switch (action.type) {
    case SORT_POSTS:
      const { sortBy } = action;
      return {
        ...state,
        sortBy
      };
    case SET_AUTHED_USER:
      const { id } = action;
      return {
        ...state,
        authedUser: id
      };
    default:
      return state;
  }
}
