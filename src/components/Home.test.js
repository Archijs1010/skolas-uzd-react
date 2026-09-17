import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';

test('renders heading and input', () => {
  render(<Home />);
  expect(screen.getByRole('heading', { name: /Home/ })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Jauns uzdevums/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Pievienot/ })).toBeInTheDocument();
});

test('does not add empty todo', async () => {
  const user = userEvent.setup();
  render(<Home />);
  await user.click(screen.getByRole('button', { name: /Pievienot/ }));
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
});

test('adds a todo when typing and clicking button', async () => {
  const user = userEvent.setup();
  render(<Home />);
  const input = screen.getByPlaceholderText(/Jauns uzdevums/);
  await user.type(input, 'Jauns uzdevums');
  await user.click(screen.getByRole('button', { name: /Pievienot/ }));
  expect(screen.getByText('Jauns uzdevums')).toBeInTheDocument();
  expect(input).toHaveValue('');
});

test('adds a todo when pressing Enter', async () => {
  const user = userEvent.setup();
  render(<Home />);
  const input = screen.getByPlaceholderText(/Jauns uzdevums/);
  await user.type(input, 'Enter uzdevums{Enter}');
  expect(screen.getByText('Enter uzdevums')).toBeInTheDocument();
});

test('can toggle a todo as completed', async () => {
  const user = userEvent.setup();
  render(<Home />);
  await user.type(screen.getByPlaceholderText(/Jauns uzdevums/), 'Pabeigt');
  await user.click(screen.getByRole('button', { name: /Pievienot/ }));
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
  await user.click(checkbox);
  expect(checkbox).toBeChecked();
});

test('can delete a todo', async () => {
  const user = userEvent.setup();
  render(<Home />);
  await user.type(screen.getByPlaceholderText(/Jauns uzdevums/), 'Dzēšamais uzdevums');
  await user.click(screen.getByRole('button', { name: /Pievienot/ }));
  expect(screen.getByText('Dzēšamais uzdevums')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /Dzēst/ }));
  expect(screen.queryByText('Dzēšamais uzdevums')).not.toBeInTheDocument();
});
