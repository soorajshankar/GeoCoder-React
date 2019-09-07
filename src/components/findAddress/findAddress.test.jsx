import React from "react";
import { shallow } from "enzyme";

import { FindAddress } from "./index";
import { VIEWMODES } from "../../constants";

describe("AddMarker Component", () => {
  it("Should renders on normal mode", () => {
    const wrapper = shallow(
      <FindAddress
        searchAddress={() => {}}
        onClose={() => {}}
        onSubmit={() => {}}
      />
    );
    expect(wrapper.find("Button").length).toEqual(1);
    expect(wrapper.find("Col").length).toEqual(2);
    expect(true).toEqual(true);
  });
  it("Should not search without any walues", () => {
    let clickCounter = 0;
    const mockBtn = () => (clickCounter = clickCounter + 1);
    const wrapper = shallow(
      <FindAddress
        searchAddress={mockBtn}
        onClose={mockBtn}
        onSubmit={mockBtn}
      />
    );
    const button = wrapper.find("Button");
    const Input = wrapper.find("Button");
    button.simulate("click");
    expect(clickCounter).toEqual(0);
  });
});
