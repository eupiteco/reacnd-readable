import {
  ADD_POST,
  RECEIVE_POSTS,
  VOTE_POST,
  REMOVE_POST,
  EDIT_POST
} from "../actions/posts";
import { ADD_COMMENT, REMOVE_COMMENT } from "../actions/comments";

export function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      const postsById = {};
      action.posts.forEach(post => {
        postsById[post.id] = post;
      });
      return {
        ...state,
        ...postsById
      };
    case VOTE_POST:
      const { id, vote } = action.data;
      const newScore = state[id].voteScore + vote;
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: newScore
        }
      };
    case ADD_POST:
      const { post } = action;
      return {
        ...state,
        [post.id]: post
      };
    case REMOVE_POST:
      const { removedPost } = action;
      return {
        ...state,
        [removedPost.id]: removedPost
      };
    case EDIT_POST:
      const { editedPost } = action;
      return {
        ...state,
        [editedPost.id]: {
          ...editedPost
        }
      };
    case ADD_COMMENT:
      const { parentId } = action.comment;
      return {
        ...state,
        [parentId]: {
          ...state[parentId],
          commentCount: state[parentId].commentCount + 1
        }
      };
    case REMOVE_COMMENT:
      const removedId = action.removedComment.parentId;
      return {
        ...state,
        [removedId]: {
          ...state[removedId],
          commentCount: state[removedId].commentCount - 1
        }
      };
    default:
      return state;
  }
}
