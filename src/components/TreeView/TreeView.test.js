import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TreeView from "./TreeView";

const mockData = {
  0: {
    id: "root",
    name: "Root Node",
    isChecked: false,
    partialCheck: false,
    children: {
      1: {
        id: "child-1",
        name: "Child Node 1",
        isChecked: false,
        partialCheck: false,
        children: {},
      },
    },
  },
};

describe("TreeView Component", () => {
  test("renders TreeView with title and root node", () => {
    render(<TreeView data={mockData} setData={() => {}} />);
    expect(screen.getByText("Árvore de Seleção")).toBeInTheDocument();
    expect(screen.getByText("Root Node")).toBeInTheDocument();
  });

  test('clicking "Show" button reveals child nodes', () => {
    render(<TreeView data={mockData} setData={() => {}} />);
    fireEvent.click(screen.getByText("Show"));
    expect(screen.getByText("Child Node 1")).toBeInTheDocument();
  });

  test("checking a child node calls setData with updated state", () => {
    const setData = jest.fn();
    render(<TreeView data={mockData} setData={setData} />);

    fireEvent.click(screen.getByText("Show"));

    fireEvent.click(screen.getByLabelText("Child Node 1"));

    expect(setData).toHaveBeenCalledTimes(1);
    expect(setData).toHaveBeenCalledWith(expect.any(Function));
  });
});
