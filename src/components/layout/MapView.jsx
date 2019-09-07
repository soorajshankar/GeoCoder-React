import React from "react";
import { VIEWMODES } from "../../constants";

export const MapView = props => (
  <div
    className={`c-mapview ${
      props.viewMode === VIEWMODES.EDIT_MODE
        ? "c-mapview--expanded"
        : "c-mapview--collapse"
    }`}
  >
    {props.children}
  </div>
);
