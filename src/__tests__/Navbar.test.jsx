import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../components/Navbar';

const mockItems = [
  { id: 'HOME', label: 'Home' },
  { id: 'TODO', label: 'TODO list' }
];

describe('Navbar Component', () => {
  test('відображає всі передані пункти навігації', () => {
    render(<Navbar navItems={mockItems} activeTab="HOME" handleNavClick={() => {}} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('TODO list')).toBeInTheDocument();
  });

  test('викликає handleNavClick при натисканні на кнопку', () => {
    const handleClick = jest.fn();
    render(<Navbar navItems={mockItems} activeTab="HOME" handleNavClick={handleClick} />);
    fireEvent.click(screen.getByText('TODO list'));
    expect(handleClick).toHaveBeenCalledWith('TODO');
  });
});