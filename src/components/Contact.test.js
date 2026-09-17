import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';

test('renders form elements', () => {
  render(<Contact />);
  expect(screen.getByRole('heading', { name: /Contact/ })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Vārds/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/E-pasts/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Ziņojums/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Sūtīt/ })).toBeInTheDocument();
});

test('allows typing in name field', async () => {
  const user = userEvent.setup();
  render(<Contact />);
  const nameInput = screen.getByPlaceholderText(/Vārds/);
  await user.type(nameInput, 'Artūrs');
  expect(nameInput).toHaveValue('Artūrs');
});

test('allows typing in email field', async () => {
  const user = userEvent.setup();
  render(<Contact />);
  const emailInput = screen.getByPlaceholderText(/E-pasts/);
  await user.type(emailInput, 'test@example.com');
  expect(emailInput).toHaveValue('test@example.com');
});

test('allows typing in message field', async () => {
  const user = userEvent.setup();
  render(<Contact />);
  const messageInput = screen.getByPlaceholderText(/Ziņojums/);
  await user.type(messageInput, 'Sveiki!');
  expect(messageInput).toHaveValue('Sveiki!');
});

test('submits form without page reload', async () => {
  const user = userEvent.setup();
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  render(<Contact />);
  await user.type(screen.getByPlaceholderText(/Vārds/), 'Test');
  await user.type(screen.getByPlaceholderText(/E-pasts/), 'a@b.c');
  await user.type(screen.getByPlaceholderText(/Ziņojums/), 'Ziņa');
  await user.click(screen.getByRole('button', { name: /Sūtīt/ }));
  expect(consoleSpy).toHaveBeenCalledWith({ name: 'Test', email: 'a@b.c', message: 'Ziņa' });
  consoleSpy.mockRestore();
});
