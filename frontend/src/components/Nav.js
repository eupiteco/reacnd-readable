import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { sortPosts } from "../actions/posts";
import Categories from "./Categories";

class Nav extends React.Component {
  static propTypes = {
    sortByDate: PropTypes.func.isRequired,
    sortByScore: PropTypes.func.isRequired
  };
  render() {
    return (
      <div className="nav">
        <Link to="/">
          <h2>Home</h2>
        </Link>
        <Link className="new-post-btn" to="/new">
          Add Post
        </Link>
        <h4>Categories</h4>
        <Categories />
        <h4> Sort posts by</h4>
        <ul>
          <li>
            <button className="sort-btn" onClick={this.props.sortByDate}>
              Date
            </button>
          </li>
          <li>
            <button className="sort-btn" onClick={this.props.sortByScore}>
              Score
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortByDate: () => dispatch(sortPosts("date")),
    sortByScore: () => dispatch(sortPosts("score"))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Nav);
