// components/SaveButton.js
import React from "react";
import  "./SaveButton.scss"

const SaveButton = ({ onSave, isDisabled }) => {
  return (
    <button className="save-button" onClick={onSave} disabled={isDisabled}>
      Save
    </button>
  );
};

export default SaveButton;
