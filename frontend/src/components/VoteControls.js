import React from "react";
import PropTypes from "prop-types";

const VoteControls = ({ upVote, downVote, id, voteScore }) => (
  <div className="votes">
    <button onClick={() => upVote(id)}>
      <span className="up" />
    </button>
    <div className="score">{voteScore}</div>
    <button onClick={() => downVote(id)}>
      <span className="down" />
    </button>
  </div>
);

VoteControls.propTypes = {
  id: PropTypes.string.isRequired,
  downVote: PropTypes.func.isRequired,
  upVote: PropTypes.func.isRequired,
  voteScore: PropTypes.number.isRequired
};

export default VoteControls;
