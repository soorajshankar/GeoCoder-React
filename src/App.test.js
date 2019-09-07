import React from "react";
import { shallow } from "enzyme";

import App from "./App";

describe("App Component", () => {
  it("Renders with all childern", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("DefaultLayout").length).toEqual(1);
  });
});
