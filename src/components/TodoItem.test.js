import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from './TodoItem';

const mockTodo = { id: 1, text: 'Testēt lietotni', completed: false };
const mockCompletedTodo = { id: 2, text: 'Gatavot ēdienu', completed: true };

test('renders todo text', () => {
  render(<TodoItem todo={mockTodo} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getByText('Testēt lietotni')).toBeInTheDocument();
});

test('shows unchecked checkbox for incomplete todo', () => {
  render(<TodoItem todo={mockTodo} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getByRole('checkbox')).not.toBeChecked();
});

test('shows checked checkbox for completed todo', () => {
  render(<TodoItem todo={mockCompletedTodo} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getByRole('checkbox')).toBeChecked();
});

test('calls onToggle when checkbox is clicked', async () => {
  const user = userEvent.setup();
  const onToggle = jest.fn();
  render(<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={() => {}} />);
  await user.click(screen.getByRole('checkbox'));
  expect(onToggle).toHaveBeenCalledWith(1);
});

test('calls onDelete when delete button is clicked', async () => {
  const user = userEvent.setup();
  const onDelete = jest.fn();
  render(<TodoItem todo={mockTodo} onToggle={() => {}} onDelete={onDelete} />);
  await user.click(screen.getByRole('button', { name: /Dzēst/ }));
  expect(onDelete).toHaveBeenCalledWith(1);
});

test('applies line-through style when completed', () => {
  render(<TodoItem todo={mockCompletedTodo} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getByText('Gatavot ēdienu')).toHaveStyle('text-decoration: line-through');
});

test('does not apply line-through style when not completed', () => {
  render(<TodoItem todo={mockTodo} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getByText('Testēt lietotni')).toHaveStyle('text-decoration: none');
});
