import React from "react";
import { Popconfirm } from "antd";

export const MarkerList = props => {
  const { onRemove, onEdit } = props;
  return (
    <div className="c-list">
      {props.markers &&
        props.markers.map((item, index) => (
          <article key={index} className="c-list__card">
            <header
              className="cursor-zoom"
              onClick={() => props.onItemClick(item)}
            >
              {item.name}
            </header>
            <p>lat :{item.lat}</p>
            <p>lng :{item.lng}</p>
            <footer>
              <button onClick={() => onEdit(item, index)}>Edit</button>
              <span>or</span>
              <Popconfirm
                title="Are you sure delete this marker?"
                onConfirm={() => onRemove(item, index)}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <button>Remove</button>
              </Popconfirm>
            </footer>
          </article>
        ))}
    </div>
  );
};
