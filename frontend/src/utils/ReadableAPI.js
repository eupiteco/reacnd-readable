import { generateHash } from "./helpers";

// Frontend data sending
export function getInitialData() {
  return Promise.all([_getPosts(), _getCategories()]).then(
    ([posts, categories]) => ({
      posts,
      categories
    })
  );
}

export function getComments(id) {
  return _getComments(id);
}

export function newComment(data) {
  return _newComment(data);
}

export function upVoteComment(id) {
  return _voteComment(id, { option: "upVote" });
}

export function downVoteComment(id) {
  return _voteComment(id, { option: "downVote" });
}

export function removeComment(id) {
  return _removeComment(id);
}

export function editComment(id, params) {
  return _editComment(id, params);
}

export function upVotePost(id) {
  return _votePost(id, { option: "upVote" });
}

export function downVotePost(id) {
  return _votePost(id, { option: "downVote" });
}

export function newPost(data) {
  return _newPost(data);
}

export function removePost(id) {
  return _removePost(id);
}

export function editPost(id, params) {
  return _editPost(id, params);
}
//
// Server data handles
const api = "http://localhost:3001";

let token = localStorage.token;
if (!token) token = localStorage.token = generateHash();
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: token
};

const _getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

const _getComments = id =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);

const _voteComment = (id, vote) =>
  fetch(`${api}/comments/${id}`, {
    headers,
    method: "POST",
    body: JSON.stringify(vote)
  });

const _newComment = newCommentData => {
  return fetch(`${api}/comments`, {
    headers,
    method: "POST",
    body: JSON.stringify(newCommentData)
  })
    .then(res => res.json())
    .then(data => data);
};

const _removeComment = id => {
  return fetch(`${api}/comments/${id}`, { headers, method: "DELETE" })
    .then(res => res.json())
    .then(data => data);
};

const _editComment = (id, params) =>
  fetch(`${api}/comments/${id}`, {
    headers,
    method: "PUT",
    body: JSON.stringify(params)
  })
    .then(res => res.json())
    .then(data => data);

const _votePost = (id, vote) =>
  fetch(`${api}/posts/${id}`, {
    headers,
    method: "POST",
    body: JSON.stringify(vote)
  });

const _getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

const _newPost = newPostData => {
  return fetch(`${api}/posts`, {
    headers,
    method: "POST",
    body: JSON.stringify(newPostData)
  })
    .then(res => res.json())
    .then(data => data);
};

const _removePost = id => {
  return fetch(`${api}/posts/${id}`, { headers, method: "DELETE" })
    .then(res => res.json())
    .then(data => data);
};

const _editPost = (id, params) =>
  fetch(`${api}/posts/${id}`, {
    headers,
    method: "PUT",
    body: JSON.stringify(params)
  })
    .then(res => res.json())
    .then(data => data);
