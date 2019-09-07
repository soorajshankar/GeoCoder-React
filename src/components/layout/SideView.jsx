import React from "react";
import { VIEWMODES } from "../../constants";

export const SideView = props => (
  <div
    className={`c-sideview ${
      props.viewMode === (VIEWMODES.EDIT_MODE || VIEWMODES.ADD_MODE)
        ? "c-sideview--collapse"
        : "c-sideview--expanded"
    }`}
  >
    {props.children}
  </div>
);
