import React from "react";
import { VIEWMODES } from "../../constants";

export const MapView = props => (
  <div
    className={`c-mapview ${
      props.viewMode === (VIEWMODES.EDIT_MODE||VIEWMODES.ADD_MODEÎ)
        ? "c-mapview--expanded"
        : "c-mapview--collapse"
    }`}
  >
    {props.children}
  </div>
);
