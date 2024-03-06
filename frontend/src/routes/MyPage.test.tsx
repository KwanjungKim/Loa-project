import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

// route
import MyPageRoute from "./MyPage";

describe("MyPage Route", () => {
  beforeEach(() => {
    render(
      <Router>
        <MyPageRoute />
      </Router>,
    );
  });

  it("should render MyPage route", () => {
    const text = screen.getByText(/MyPageRoute/i);
    expect(text).toBeInTheDocument();
  });
});
