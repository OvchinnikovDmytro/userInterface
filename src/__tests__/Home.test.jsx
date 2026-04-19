import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/Home';

describe('Home Page', () => {
  test('checks welcome message for anonymous user', () => {
    render(<Home isLoggedIn={false} />);
    expect(screen.getByText(/Сервіс Emerald Tasks Відкрито/i)).toBeInTheDocument();
  });

  test('checks username display when authorized', () => {
    const user = { name: 'Дмитро' };
    render(<Home isLoggedIn={true} currentUser={user} />);
    expect(screen.getByText(/Вітаємо знову, Дмитро/i)).toBeInTheDocument();
  });
});