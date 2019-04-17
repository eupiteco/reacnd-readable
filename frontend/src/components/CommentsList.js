import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Comment from "./Comment";

class CommentsList extends React.Component {
  static propTypes = {
    commentsIds: PropTypes.arrayOf(PropTypes.string).isRequired
  };
  render() {
    const { commentsIds } = this.props;
    return (
      <div className="comment-list">
        {commentsIds.map(id => {
          return <Comment id={id} key={id} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ comments }) => {
  const commentsIds = comments
    ? Object.keys(comments)
        .sort((a, b) => comments[b].timestamp - comments[a].timestamp)
        .filter(id => comments[id].deleted === false)
    : [];
  return {
    commentsIds
  };
};
export default connect(mapStateToProps)(CommentsList);
