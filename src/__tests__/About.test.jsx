import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from '../pages/About';

describe('About Page', () => {
  test('відображає заголовок та логотип', () => {
    render(<About />);
    expect(screen.getByText(/About Emerald/i)).toBeInTheDocument();
    const img = screen.getByAltText('Logo');
    expect(img).toBeInTheDocument();
    // Перевіряємо, що шлях до картинки підмінився нашим моком
    expect(img.src).toContain('test-file-stub');
  });
});