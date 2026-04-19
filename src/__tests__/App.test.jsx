import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Integration', () => {
  test('показує alert при спробі зайти в TODO без логіну', () => {
    window.alert = jest.fn();
    render(<App />);
    fireEvent.click(screen.getByText('TODO list'));
    expect(window.alert).toHaveBeenCalledWith('Будь ласка, увійдіть у систему!');
  });

  test('перемикається на сторінку About', () => {
    render(<App />);
    fireEvent.click(screen.getByText('About'));
    expect(screen.getByText(/About Emerald/i)).toBeInTheDocument();
  });
});