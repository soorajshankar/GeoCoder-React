import React from "react";
import { shallow } from "enzyme";

import { MarkerList } from "./index";
const markers = [{ name: "sooraj", lat: 10, lng: 11 }];
describe("MarkerList Component", () => {
  it("Renders without crashing", () => {
    const fakeProps = {
      markers,
      onRemove: (item, index) => {},
      onEdit: (item, index) => {}
    };
    const wrapper = shallow(<MarkerList {...fakeProps} />);
    expect(wrapper.find("header").text()).toEqual("sooraj");
    expect(wrapper.find("p").length).toEqual(2);
    expect(true).toEqual(true);
  });
});
