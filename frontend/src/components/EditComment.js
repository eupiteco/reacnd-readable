import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { handleEditComment } from "../actions/comments";

class EditComment extends React.Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    stopEditing: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired
  };
  state = {
    body: ""
  };
  componentDidMount() {
    this.setContent();
  }

  render() {
    return (
      <div className="edit-comment">
        <textarea
          className="body-input"
          value={this.state.body}
          onChange={this.handleBody}
        />
        <div className="buttons">
          <button className="btn btn-cancel" onClick={this.props.stopEditing}>
            Cancel
          </button>
          <button
            className="btn btn-submit"
            type="submit"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
  setContent = () => {
    this.setState(() => ({
      body: this.props.comment.body
    }));
  };

  handleBody = e => {
    const body = e.target.value;
    this.setState(() => ({
      body
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { id } = this.props.comment;
    const timestamp = Date.now();
    const { editComment } = this.props;
    const { body } = this.state;
    editComment(id, { timestamp, body });
    this.props.stopEditing();
  };
}

const mapStateToProps = ({ comments, flags }, { cancelAction, id }) => ({
  author: flags.authedUser,
  comment: comments[id],
  stopEditing: cancelAction
});

const mapDispatchToProps = dispatch => ({
  editComment: (id, params) => dispatch(handleEditComment(id, params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditComment);
