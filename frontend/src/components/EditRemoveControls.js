import React from "react";
import PropTypes from "prop-types";
import { Edit as EditIcon, Trash2 as RemoveIcon } from "react-feather";

const EditRemoveControls = ({ editAction, removeAction, size }) => {
  let iconSize = 24;
  if (size === "s") iconSize = 18;
  return (
    <div className="rem-ed-buttons">
      <button className="icon-btn" onClick={() => editAction()}>
        <EditIcon size={iconSize} />
      </button>
      <button className="icon-btn" onClick={() => removeAction()}>
        <RemoveIcon size={iconSize} />
      </button>
    </div>
  );
};

EditRemoveControls.propTypes = {
  editAction: PropTypes.func.isRequired,
  removeAction: PropTypes.func.isRequired,
  size: PropTypes.any
};

export default EditRemoveControls;
