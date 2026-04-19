import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../pages/Register';

describe('Register Page', () => {
  const mockSetRegData = jest.fn();
  const mockHandleRegister = jest.fn((e) => e.preventDefault());
  
  const defaultRegData = {
    name: '',
    email: '',
    password: '',
    sex: '',
    dob: ''
  };

  test('відображає заголовок та всі поля форми', () => {
    render(
      <Register 
        regData={defaultRegData} 
        setRegData={mockSetRegData} 
        handleRegister={mockHandleRegister} 
      />
    );

    expect(screen.getByText(/Реєстрація/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ім'я/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument(); // Select для статі
    expect(screen.getByRole('button', { name: /Зареєструватися/i })).toBeInTheDocument();
  });

  test('викликає setRegData при зміні текстових полів', () => {
    render(
      <Register 
        regData={defaultRegData} 
        setRegData={mockSetRegData} 
        handleRegister={mockHandleRegister} 
      />
    );

    const nameInput = screen.getByPlaceholderText(/Ім'я/i);
    fireEvent.change(nameInput, { target: { value: 'Олександр' } });
    
    // Перевіряємо, чи викликається функція оновлення стану
    expect(mockSetRegData).toHaveBeenCalled();
  });

  test('правильно вибирається стать зі списку', () => {
    render(
      <Register 
        regData={defaultRegData} 
        setRegData={mockSetRegData} 
        handleRegister={mockHandleRegister} 
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Чоловік' } });
    
    expect(mockSetRegData).toHaveBeenCalled();
  });

  test('викликає handleRegister при сабміті форми', () => {
    render(
      <Register 
        regData={defaultRegData} 
        setRegData={mockSetRegData} 
        handleRegister={mockHandleRegister} 
      />
    );

    const submitButton = screen.getByRole('button', { name: /Зареєструватися/i });
    fireEvent.click(submitButton);

    expect(mockHandleRegister).toHaveBeenCalledTimes(1);
  });
});