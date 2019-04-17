import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { generateHash } from "../utils/helpers";
import { handleNewPost } from "../actions/posts";

class NewPost extends React.Component {
  static propTypes = {
    authedUser: PropTypes.string.isRequired,
    categories: PropTypes.object.isRequired,
    categoryIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleNewPost: PropTypes.func.isRequired
  };
  state = {
    title: "",
    body: "",
    category: "",
    toHome: false
  };

  render() {
    const { title, body, toHome } = this.state;
    const { categories, categoryIds } = this.props;
    if (toHome === true) return <Redirect to="/" />;
    return (
      <div>
        <h1 className="center">New Post</h1>
        <div className="new-post">
          <div className="inputs">
            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={this.handleTitle}
              className="title-input"
            />
            <textarea
              placeholder="Post content"
              value={body}
              onChange={this.handleContent}
              className="body-input"
            />
          </div>
          <div className="controls">
            <select className="category-picker" onChange={this.handleCategory}>
              <option key="none" className="placeholder">
                Choose a category
              </option>
              {categoryIds.map(id => {
                const c = categories[id];
                return <option key={c.path}>{c.name}</option>;
              })}
            </select>
            <div className="buttons">
              <button
                className="btn btn-cancel"
                onClick={() => this.setState({ toHome: true })}
              >
                Cancel
              </button>
              <button
                className="btn btn-submit"
                type="submit"
                disabled={!this.isValid()}
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    const timestamp = Date.now();
    const id = generateHash();
    const { title, body, category } = this.state;
    const author = this.props.authedUser;
    const newPost = {
      id,
      title,
      body,
      category,
      author,
      timestamp
    };
    this.props.handleNewPost(newPost);

    this.setState(() => ({
      title: "",
      body: "",
      category: "",
      toHome: true
    }));
  };

  isValid = () => {
    const { title, body, category } = this.state;
    if (title === "" || body === "" || category === "") return false;
    return true;
  };

  handleTitle = e => {
    const title = e.target.value;
    this.setState(() => ({
      title
    }));
  };

  handleContent = e => {
    const body = e.target.value;
    this.setState(() => ({
      body
    }));
  };

  handleCategory = e => {
    const category = e.target.value;
    this.setState(() => ({
      category
    }));
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNewPost: data => dispatch(handleNewPost(data))
  };
}

function mapStateToProps({ categories, flags }) {
  const { authedUser } = flags;
  return {
    authedUser,
    categories,
    categoryIds: Object.keys(categories)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);
