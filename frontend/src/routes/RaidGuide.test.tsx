import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

// route
import RaidGuideRoute from "./RaidGuide";

describe("Raid Guide Route", () => {
  beforeEach(() => {
    render(
      <Router>
        <RaidGuideRoute />
      </Router>,
    );
  });

  it("should render calendar route", () => {
    const text = screen.getByText(/RaidGuideRoute/i);
    expect(text).toBeInTheDocument();
  });
});
