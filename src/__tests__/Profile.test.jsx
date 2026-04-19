import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../pages/Profile';

describe('Profile Page', () => {
  const mockUser = {
    name: 'Дмитро Овчінніков',
    email: 'dmytro@mail.com',
    sex: 'Чоловік',
    dob: '2000-01-01'
  };

  test('checks user data display', () => {
    render(<Profile currentUser={mockUser} onLogout={() => {}} />);

    expect(screen.getByText(/Профіль/i)).toBeInTheDocument();

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.sex)).toBeInTheDocument();
    expect(screen.getByText(mockUser.dob)).toBeInTheDocument();
  });

  test('checks onLogout call on button click', () => {
    const handleLogout = jest.fn();
    render(<Profile currentUser={mockUser} onLogout={handleLogout} />);

    const logoutButton = screen.getByRole('button', { name: /Вийти з акаунту/i });
    fireEvent.click(logoutButton);

    expect(handleLogout).toHaveBeenCalledTimes(1);
  });

  test('checks component stability with null user data', () => {
    render(<Profile currentUser={null} onLogout={() => {}} />);
    
    expect(screen.getByText(/Профіль/i)).toBeInTheDocument();
  });
});