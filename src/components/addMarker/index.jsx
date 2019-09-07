import React from "react";

export const AddMarker = ({ onClick }) => {
  return (
    <div className="c-add-marker">
      <button className="c-add-marker__btn" onClick={onClick}>
        Add Marker
      </button>
    </div>
  );
};
