import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

jest.mock("./data.json", () => ({
  0: {
    id: "2469bdab-23b5-4cb8-90c9-c609a49410b0",
    name: "Richard Paul M.",
    children: {
      0: {
        id: "6410eff5-5aff-46fd-bb08-ed90581007b4",
        name: "Maurice Rudolf Ludwig",
        children: {
          0: {
            id: "35996ee4-74a6-4343-ba5e-9700c24bee11",
            name: "Joseph E. James A.",
            children: {},
          },
        },
      },
    },
  },
}));

describe("App Component", () => {
  test("loads and displays tree view", async () => {
    render(<App />);
    expect(screen.getByText("Richard Paul M.")).toBeInTheDocument();
  });
});
