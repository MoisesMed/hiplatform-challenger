import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TreeItem from "./TreeItem";

jest.mock("../../data.json", () => ({
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

describe("TreeItem Component", () => {
  const mockChangeJson = jest.fn();
  const mockItem = {
    id: "2469bdab-23b5-4cb8-90c9-c609a49410b0",
    name: "Richard Paul M.",
    isChecked: false,
    partialCheck: false,
    children: {
      "6410eff5-5aff-46fd-bb08-ed90581007b4": {
        id: "6410eff5-5aff-46fd-bb08-ed90581007b4",
        name: "Maurice Rudolf Ludwig",
        isChecked: false,
        partialCheck: false,
        level: 1,
        children: {
          "35996ee4-74a6-4343-ba5e-9700c24bee11": {
            id: "35996ee4-74a6-4343-ba5e-9700c24bee11",
            name: "Joseph E. James A.",
            isChecked: false,
            partialCheck: false,
            level: 2,
            children: {},
          },
        },
      },
    },
  };

  test("renders TreeItem with checkbox and label", () => {
    render(
      <TreeItem data={mockItem} item={mockItem} changeJson={mockChangeJson} />
    );

    expect(screen.getByText("Richard Paul M.")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  test("checkbox change triggers changeJson function", () => {
    render(
      <TreeItem data={mockItem} item={mockItem} changeJson={mockChangeJson} />
    );

    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockChangeJson).toHaveBeenCalledWith(mockItem.id, true);
  });

  test("clicking show button reveals children", () => {
    render(
      <TreeItem data={mockItem} item={mockItem} changeJson={mockChangeJson} />
    );

    const showButton = screen.getByText("Show");
    fireEvent.click(showButton);

    expect(showButton.textContent).toBe("Hide");
    expect(screen.getByText("Maurice Rudolf Ludwig")).toBeInTheDocument();
  });
});
