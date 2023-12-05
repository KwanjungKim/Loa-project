import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

// route
import HomeRoute from "./HomeRoute";

describe("Home Route", () => {
  beforeEach(() => {
    render(
      <Router>
        <HomeRoute />
      </Router>,
    );
  });

  it("should render home", () => {
    const text = screen.getByText(/home/i);
    expect(text).toBeInTheDocument();
  });
});
