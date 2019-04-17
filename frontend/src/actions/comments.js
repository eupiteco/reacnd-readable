import {
  upVoteComment as upVote,
  downVoteComment as downVote,
  getComments,
  newComment,
  removeComment,
  editComment
} from "../utils/ReadableAPI";

export const ADD_COMMENT = "ADD_COMMENT";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const VOTE_COMMENT = "VOTE_COMMENT";

export function handleComments(id) {
  return dispatch => {
    return getComments(id).then(comments => {
      dispatch(receiveComments(comments));
    });
  };
}

export function handleNewComment(comment) {
  return dispatch => {
    return newComment(comment).then(data => {
      dispatch(addComment(data));
    });
  };
}

export function handleRemoveComment(id) {
  return dispatch => {
    return removeComment(id).then(data => {
      dispatch(remComment(data));
    });
  };
}

export function handleEditComment(id, params) {
  return dispatch => {
    return editComment(id, params).then(editedComment => {
      dispatch(edComment(editedComment));
    });
  };
}

export function handleUpVote(id) {
  return dispatch => {
    dispatch(upVoteComment(id));
    return upVote(id).catch(e => {
      dispatch(downVoteComment(id));
      console.log(e);
      alert("There was an error, try again.");
    });
  };
}

export function handleDownVote(id) {
  return dispatch => {
    dispatch(downVoteComment(id));
    return downVote(id).catch(e => {
      dispatch(upVoteComment(id));
      console.log(e);
      alert("There was an error, try again.");
    });
  };
}

function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

function remComment(removedComment) {
  return {
    type: REMOVE_COMMENT,
    removedComment
  };
}

function edComment(editedComment) {
  return {
    type: EDIT_COMMENT,
    editedComment
  };
}

function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
}

function upVoteComment(id) {
  return {
    type: VOTE_COMMENT,
    data: {
      id,
      vote: 1
    }
  };
}

function downVoteComment(id) {
  return {
    type: VOTE_COMMENT,
    data: {
      id,
      vote: -1
    }
  };
}
