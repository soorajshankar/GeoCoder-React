import React from "react";
import { shallow } from "enzyme";

import { AddMarker } from "./index";
import { VIEWMODES } from "../../constants";
import jest from "jest";

describe("AddMarker Component", () => {
  it("Should renders on normal mode", () => {
    const normalProps = {
      viewMode: VIEWMODES.NORMAL_MODE,
      onClick: () => {}
    };
    const wrapper = shallow(<AddMarker {...normalProps} />);
    expect(wrapper.find("button").text()).toEqual("Add Marker");
    expect(true).toEqual(true);
  });
  it("Should respond to user events", () => {
    let clickCounter = 0;
    const mockBtn = () => (clickCounter = clickCounter + 1);
    const normalProps = {
      viewMode: VIEWMODES.NORMAL_MODE,
      onClick: mockBtn
    };
    const wrapper = shallow(<AddMarker {...normalProps} />);
    const button = wrapper.find("button");
    button.simulate("click");
    expect(clickCounter).toEqual(1);
    expect(true).toEqual(true);
  });
});
