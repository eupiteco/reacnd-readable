import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { handleComments } from "../actions/comments";
import Post from "./Post";
import CommentsList from "./CommentsList";
import NewComment from "./NewComment";

class PostPage extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    receiveComments: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.receiveComments(this.props.id);
  }
  render() {
    const { id } = this.props;
    return (
      <div className="post-page">
        <Post postId={id} details />
        <CommentsList id={id} />
        <NewComment />
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const { id } = match.params;
  return {
    id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    receiveComments: id => dispatch(handleComments(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);
