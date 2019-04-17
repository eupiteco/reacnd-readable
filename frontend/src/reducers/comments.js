import {
  RECEIVE_COMMENTS,
  VOTE_COMMENT,
  ADD_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT
} from "../actions/comments";

export function comments(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      const { comments } = action;
      const commentsById = {};
      comments.forEach(c => {
        commentsById[c.id] = c;
      });
      return {
        ...commentsById
      };
    case VOTE_COMMENT:
      const { id, vote } = action.data;
      const newScore = state[id].voteScore + vote;
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: newScore
        }
      };
    case ADD_COMMENT:
      const { comment } = action;
      return {
        ...state,
        [comment.id]: comment
      };
    case REMOVE_COMMENT:
      const { removedComment } = action;
      return {
        ...state,
        [removedComment.id]: removedComment
      };
    case EDIT_COMMENT:
      const { editedComment } = action;
      return {
        ...state,
        [editedComment.id]: {
          ...editedComment
        }
      };
    default:
      return state;
  }
}
