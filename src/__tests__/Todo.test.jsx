import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from '../pages/Todo';

const mockTasks = [{ id: 1, title: 'Тестова справа', completed: false }];

describe('Todo Page', () => {
  test('checks handleAddTask call on add button click', () => {
    const addFn = jest.fn();
    render(<Todo myTasks={[]} handleAddTask={addFn} />);
    fireEvent.click(screen.getByText(/Додати/i));
    expect(addFn).toHaveBeenCalled();
  });

  test('checks handleToggleTask call on checkbox click', () => {
    const toggleFn = jest.fn();
    render(<Todo myTasks={mockTasks} handleToggleTask={toggleFn} />);
    
    const toggleBtn = screen.getByRole('button', { name: '' }); 
    fireEvent.click(toggleBtn);
    expect(toggleFn).toHaveBeenCalledWith(1);
  });

  test('checks editing mode activation on edit button click', () => {
    const setEditId = jest.fn();
    const setEditText = jest.fn();
    
    render(<Todo 
      myTasks={mockTasks} 
      setEditingId={setEditId} 
      setEditingText={setEditText} 
    />);

    fireEvent.click(screen.getByText('Edit'));
    
    expect(setEditId).toHaveBeenCalledWith(1);
    expect(setEditText).toHaveBeenCalledWith('Тестова справа');
  });

  test('checks setEditingText call on input change', () => {
    const setEditText = jest.fn();
    
    render(<Todo 
      myTasks={mockTasks} 
      editingId={1} 
      editingText="Старий текст" 
      setEditingText={setEditText} 
    />);

    const editInput = screen.getByDisplayValue('Старий текст');
    fireEvent.change(editInput, { target: { value: 'Новий текст' } });
    
    expect(setEditText).toHaveBeenCalled();
  });

  test('checks handleSaveEdit call on input blur', () => {
    const saveFn = jest.fn();
    render(<Todo 
      myTasks={mockTasks} 
      editingId={1} 
      editingText="Купити молоко" 
      handleSaveEdit={saveFn}
      setEditingText={() => {}}
    />);

    const input = screen.getByDisplayValue('Купити молоко');
    fireEvent.blur(input);
    expect(saveFn).toHaveBeenCalledWith(1);
  });

  test('checks empty state message rendering', () => {
    render(<Todo myTasks={[]} />);
    expect(screen.getByText(/У вас поки немає справ/i)).toBeInTheDocument();
  });
});