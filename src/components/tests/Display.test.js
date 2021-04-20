///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockFetchShow from "../../api/fetchShow";
import Display from "../Display";

jest.mock("../../api/fetchShow");

const testDisplay = {
  summary: "",
  name: "Stranger Things",
  seasons: [
    {
      id: 0,
      name: "Season 1",
      episodes: [],
    },
    {
      id: 1,
      name: "Season 2",
      episodes: [],
    },
    {
      id: 2,
      name: "Season 3",
      episodes: [],
    },

    {
      id: 3,
      name: "Season 4",
      episodes: [],
    },
  ],
};

test("renders comp without props being passed", () => {
  render(<Display />);
});

test("When the fetch button is pressed, show the component will display", async () => {
  render(<Display />);
  mockFetchShow.mockResolvedValueOnce(testDisplay);
  const button = screen.getByRole("button", /press to get show data/i);
  userEvent.click(button);
  const showRender = await screen.findByTestId("show-container");
  expect(showRender).toBeInTheDocument();
});

test("When the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data", async () => {
  render(<Display />);
  mockFetchShow.mockResolvedValueOnce(testDisplay);
  const button = screen.getByRole("button", /press to get show data/i);
  userEvent.click(button);
  const seasonMatch = await screen.findAllByTestId("season-option");
  expect(seasonMatch).toHaveLength(4);
});

test("", () => {
  const mockDisplayFunc = jest.fn();
  render(<Display displayFunc={mockDisplayFunc} />);
  mockFetchShow.mockResolvedValueOnce(testDisplay);
  const button = screen.getByRole("button", /press to get show data/i);
  userEvent.click(button);
  waitFor(() => expect(mockDisplayFunc).toHaveBeenCalledTimes(1));
});
