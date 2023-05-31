import { render, screen } from "@testing-library/react";
import Home from "../Home";

describe('Home', () => {
  it('renders the same headline', () => {
    render(<Home />);
    const headingElement = screen.getByRole('heading', { level: 1, name: /welcome to the admin panel/i });
    expect(headingElement).toBeInTheDocument();
  });
});
