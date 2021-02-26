import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Dashboard from "./Dashboard.js";
import { FEN, PIECE_VALUE, BUTTONS } from "../../constants/constants";

afterEach(cleanup);

it("should create an empty dashboard", () => {
  const { queryByText } = render(<Dashboard fenCode={FEN.EMPTY} />);

  const pawn = queryByText(PIECE_VALUE.WHITE.PAWN);
  expect(pawn).toBeNull();
});

it("should spawn one pawn in the dashboard", () => {
  const { queryByText } = render(<Dashboard fenCode={FEN.CHALLENGE} />);

  const pawn = queryByText(PIECE_VALUE.WHITE.PAWN);
  expect(pawn).toBeTruthy();
});

it("should add a pawn to an empty dashboard", () => {
  const { getByText, queryByText } = render(<Dashboard fenCode={FEN.EMPTY} />);

  const pawn = queryByText(PIECE_VALUE.WHITE.PAWN);
  expect(pawn).toBeNull();

  fireEvent.click(getByText(BUTTONS.ADD_PAWN));

  expect(getByText(PIECE_VALUE.WHITE.PAWN).textContent).toBeTruthy();
});

it("should convert pawn to queen if it moves to final row", () => {
  const { getByText, queryByText, getByRole } = render(
    <Dashboard fenCode={FEN.CHALLENGE} />
  );

  const pawn = queryByText(PIECE_VALUE.WHITE.PAWN);
  expect(pawn).toBeTruthy();

  fireEvent.click(
    getByRole("button", {
      name: BUTTONS.SHOW_PATH,
    })
  );

  fireEvent.click(
    getByRole("button", {
      name: BUTTONS.MOVE_TO_PATH,
    })
  );

  expect(getByText(PIECE_VALUE.WHITE.QUEEN).textContent).toBeTruthy();
});
