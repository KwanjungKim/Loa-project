import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

// route
import MyCalendarRoute from "./MyCalendarRoute";

describe("Calendar Route", () => {
  beforeEach(() => {
    render(
      <Router>
        <MyCalendarRoute />
      </Router>,
    );
  });

  it("should render calendar route", () => {
    const text = screen.getByText(/MyCalendarRoute/i);
    expect(text).toBeInTheDocument();
  });
});
