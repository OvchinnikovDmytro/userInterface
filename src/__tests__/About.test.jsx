import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from '../pages/About';

describe('About Page', () => {
  test('checks header and logo rendering', () => {
    render(<About />);
    expect(screen.getByText(/About Emerald/i)).toBeInTheDocument();
    const img = screen.getByAltText('Logo');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('test-file-stub');
  });
});