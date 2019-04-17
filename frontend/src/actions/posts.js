import {
  upVotePost as upVote,
  downVotePost as downVote,
  newPost,
  removePost,
  editPost
} from "../utils/ReadableAPI";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const ADD_POST = "ADD_POST";
export const REMOVE_POST = "REMOVE_POST";
export const EDIT_POST = "EDIT_POST";
export const SORT_POSTS = "SORT_POSTS";
export const VOTE_POST = "VOTE_POST";

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

export function sortPosts(sortBy) {
  return {
    type: SORT_POSTS,
    sortBy
  };
}

export function handleNewPost(post) {
  return dispatch => {
    return newPost(post).then(data => {
      console.log(data);
      dispatch(addPost(data));
    });
  };
}

export function handleRemovePost(id) {
  return dispatch => {
    return removePost(id).then(data => {
      dispatch(remPost(data));
    });
  };
}

export function handleEditPost(id, newPost) {
  return dispatch => {
    console.log("NA ACTION: ", id, newPost);
    return editPost(id, newPost).then(editedPost => {
      dispatch(edPost(editedPost));
    });
  };
}

export function handleUpVote(id) {
  return dispatch => {
    dispatch(upVotePost(id));
    return upVote(id).catch(e => {
      dispatch(downVotePost(id));
      console.log(e);
      alert("There was an error, try again.");
    });
  };
}

export function handleDownVote(id) {
  return dispatch => {
    dispatch(downVotePost(id));
    return downVote(id).catch(e => {
      dispatch(upVotePost(id));
      console.log(e);
      alert("There was an error, try again.");
    });
  };
}

function addPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

function remPost(removedPost) {
  return {
    type: REMOVE_POST,
    removedPost
  };
}

function edPost(editedPost) {
  return {
    type: EDIT_POST,
    editedPost
  };
}

function upVotePost(id) {
  return {
    type: VOTE_POST,
    data: {
      id,
      vote: 1
    }
  };
}

function downVotePost(id) {
  return {
    type: VOTE_POST,
    data: {
      id,
      vote: -1
    }
  };
}
