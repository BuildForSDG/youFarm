import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import Administrators from "./Users";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <Administrators />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
