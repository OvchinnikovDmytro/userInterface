import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from '../pages/Todo';

const mockTasks = [{ id: 1, title: 'Тестова справа', completed: false }];

describe('Todo Page', () => {
  test('відображає повідомлення, якщо справ немає', () => {
    render(<Todo myTasks={[]} />);
    expect(screen.getByText(/У вас поки немає справ/i)).toBeInTheDocument();
  });

  test('кнопка "Delete" викликає handleDeleteTask', () => {
    const deleteFn = jest.fn();
    render(<Todo myTasks={mockTasks} handleDeleteTask={deleteFn} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(deleteFn).toHaveBeenCalled();
  });

  test('поле вводу оновлює текст при зміні', () => {
    const setText = jest.fn();
    render(<Todo myTasks={[]} newTaskText="" setNewTaskText={setText} />);
    fireEvent.change(screen.getByPlaceholderText(/Додати нову справу/i), { target: { value: 'Нова задача' } });
    expect(setText).toHaveBeenCalled();
  });
});