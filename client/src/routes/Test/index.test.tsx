import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";

// route
import TestRoute from ".";

describe("Test Route", () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <TestRoute />
      </RecoilRoot>,
    );
  });

  it("should render initial count", () => {
    const text = screen.getByText(/0/i);
    expect(text).toBeInTheDocument();
  });

  it("should render plus button", () => {
    const button = screen.getByText(/plus/i);
    expect(button).toBeInTheDocument();
  });

  it("should render minus button", () => {
    const button = screen.getByText(/minus/i);
    expect(button).toBeInTheDocument();
  });

  it("should increment count when plus button is clicked", () => {
    const button = screen.getByText(/plus/i);
    fireEvent.click(button);
    const text = screen.getByText(/1/i);
    expect(text).toBeInTheDocument();
  });

  it("should decrement count when minus button is clicked", () => {
    const plusButton = screen.getByText(/plus/i);
    const minusButton = screen.getByText(/minus/i);
    fireEvent.click(plusButton);
    fireEvent.click(plusButton);
    fireEvent.click(minusButton);
    const text = screen.getByText(/1/i);
    expect(text).toBeInTheDocument();
  });

  it("should not exceed 10 when plus button is clicked", () => {
    const button = screen.getByText(/plus/i);
    for (let i = 0; i < 11; i++) {
      fireEvent.click(button);
    }
    const text = screen.getByText(/10/i);
    expect(text).toBeInTheDocument();
  });

  it("should not be less than 0 when minus button is clicked", () => {
    const plusButton = screen.getByText(/plus/i);
    const minusButton = screen.getByText(/minus/i);
    fireEvent.click(plusButton);
    fireEvent.click(minusButton);
    fireEvent.click(minusButton);
    const text = screen.getByText(/0/i);
    expect(text).toBeInTheDocument();
  });
});
