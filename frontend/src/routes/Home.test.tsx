import { render, screen } from "@testing-library/react";

// route
import HomeRoute from "./HomeRoute";

describe("Home Route", () => {
  beforeEach(() => {
    render(<HomeRoute />);
  });

  it("should render home", () => {
    const text = screen.getByText(/home/i);
    expect(text).toBeInTheDocument();
  });
});
