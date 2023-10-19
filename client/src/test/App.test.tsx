import { render, screen } from "@testing-library/react";

// component
import App from "../App";

describe("App", () => {
  it("renders hello world", () => {
    render(<App />);
    const helloWorld = screen.getByText(/hello world/i);
    expect(helloWorld).toBeInTheDocument();
  });
});
