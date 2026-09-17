import { render, screen } from '@testing-library/react';
import About from './About';

test('renders the About heading', () => {
  render(<About />);
  expect(screen.getByRole('heading', { name: /About/ })).toBeInTheDocument();
});

test('renders descriptive paragraphs', () => {
  render(<About />);
  const paragraphs = screen.getAllByText(/Lorem|Duis/);
  expect(paragraphs.length).toBeGreaterThanOrEqual(2);
});
