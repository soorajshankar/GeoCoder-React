import React from "react";
import { shallow } from "enzyme";

import { GenericMap } from "./index";
import { config } from "../../config/appConfig";
import { FOCUS_LOC, VIEWMODES } from "../../constants";
const markers = [{ name: "sooraj", lat: 10, lng: 11 }];

describe("AddMarker Component", () => {
  it("Renders on edit mode", () => {
    const wrapper = shallow(
      <GenericMap
        apiKey={config.GOOGLE_MAP_API_KEY}
        focusLocation={FOCUS_LOC}
        markers={markers}
        viewMode={VIEWMODES.NORMAL_MODE}
        addToMarkers={() => {}}
      />
    );
    expect(wrapper.find("Loading").length).toEqual(1);
    expect(wrapper.find("div").length).toEqual(1);
    expect(wrapper.find("#map").length).toEqual(1);
  });
});
