import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/Login';

describe('Login Page', () => {
  test('викликає handleLogin при відправці форми', () => {
    const loginFn = jest.fn(e => e.preventDefault());
    render(<Login handleLogin={loginFn} setLoginEmail={()=>{}} setLoginPassword={()=>{}} />);
    
    fireEvent.submit(screen.getByRole('button', { name: /Увійти/i }));
    expect(loginFn).toHaveBeenCalled();
  });
});