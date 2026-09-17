import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation links', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /Home/ })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /About/ })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Contact/ })).toBeInTheDocument();
});

test('renders Home page by default', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Home/ })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Jauns uzdevums/)).toBeInTheDocument();
});
