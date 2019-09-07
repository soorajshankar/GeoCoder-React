import React from "react";

export const MarkerList = props => {
  const { onRemove, onEdit } = props;
  return (
    <div className="c-list">
      {props.markers &&
        props.markers.map((item, index) => (
          <article key={index} className="c-list__card">
            <header className="cursor-zoom" onClick={() => props.onItemClick(item)}>{item.name}</header>
            <p>lat :{item.lat}</p>
            <p>lng :{item.lng}</p>
            <footer>
              <button onClick={() => onEdit(item, index)}>Edit</button>
              <span>or</span>
              <button onClick={() => onRemove(item, index)}>Remove</button>
            </footer>
          </article>
        ))}
    </div>
  );
};
