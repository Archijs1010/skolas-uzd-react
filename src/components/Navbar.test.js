import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

function renderWithRouter(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
  );
}

test('renders all navigation links', () => {
  renderWithRouter(<Navbar />);
  expect(screen.getByRole('link', { name: /Home/ })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: /About/ })).toHaveAttribute('href', '/about');
  expect(screen.getByRole('link', { name: /Contact/ })).toHaveAttribute('href', '/contact');
});

test('highlights active link based on current route', () => {
  renderWithRouter(<Navbar />, { route: '/about' });
  const aboutLink = screen.getByRole('link', { name: /About/ });
  expect(aboutLink).toHaveAttribute('aria-current', 'page');
});
