import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

beforeAll(() => {
  window.alert = jest.fn();
});

afterEach(cleanup);

describe('App test', () => {
  
  test('checks TODO tab protection and redirect', () => {
    render(<App />);
    
    const todoNav = screen.getByText(/TODO list/i);
    fireEvent.click(todoNav);
    
    expect(window.alert).toHaveBeenCalledWith('Будь ласка, увійдіть у систему!');
    expect(screen.getByText(/Вхід/i)).toBeInTheDocument();
  });

  test('checks registration validation with empty fields', () => {
    render(<App />);
    
    const regNav = screen.getByText(/Register/i);
    fireEvent.click(regNav);
    
    const regBtn = screen.getByRole('button', { name: /Зареєструватися/i });
    fireEvent.click(regBtn);
    
    expect(window.alert).toHaveBeenCalledWith('Заповніть поля!');
  });

  test('checks full user lifecycle: login error, success, and task management', () => {
    render(<App />);

    const loginNavLink = screen.getByText(/Login/i);
    fireEvent.click(loginNavLink);

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passInput = screen.getByPlaceholderText(/Пароль/i);
    const loginBtn = screen.getByRole('button', { name: /Увійти/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@a.com' } });
    fireEvent.change(passInput, { target: { value: 'wrong' } });
    fireEvent.click(loginBtn);
    expect(window.alert).toHaveBeenCalledWith('Невірні дані!');

    fireEvent.change(emailInput, { target: { value: 'a@a.com' } });
    fireEvent.change(passInput, { target: { value: '1' } });
    fireEvent.click(loginBtn);

    fireEvent.click(screen.getByText(/TODO list/i));
    
    const todoInput = screen.getByPlaceholderText(/Додати нову справу/i);
    fireEvent.change(todoInput, { target: { value: 'Coverage Task' } });
    fireEvent.click(screen.getByText(/Додати/i));
    expect(screen.getByText(/Coverage Task/i)).toBeInTheDocument();

    const allButtons = screen.getAllByRole('button');
    const checkBtn = allButtons.find(btn => btn.className.includes('rounded-full'));
    if (checkBtn) fireEvent.click(checkBtn);

    const editButtons = screen.getAllByText(/Edit/i);
    fireEvent.click(editButtons[1]);

    const editInput = screen.getByDisplayValue(/Coverage Task/i);
    fireEvent.change(editInput, { target: { value: 'Updated Task' } });
    fireEvent.blur(editInput);
    expect(screen.getByText(/Updated Task/i)).toBeInTheDocument();

    const deleteButtons = screen.getAllByText(/Delete/i);
    fireEvent.click(deleteButtons[1]);
    expect(screen.queryByText(/Updated Task/i)).not.toBeInTheDocument();
  });
});