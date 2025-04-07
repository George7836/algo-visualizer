import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Rectangle from '../src/components/Rectangle';

describe('Rectangle Component', () => {
  beforeEach(() => {
    render(<Rectangle num={5} />);
  });

  test('renders the text with the correct number', () => {
    const svg = screen.getByRole('img');

    expect(svg).toBeInTheDocument();

    const text = screen.getByTestId('rectangle');

    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('5');
  });

  test('number is centered within the rectangle', () => {
    const text = screen.getByTestId('rectangle');

    expect(text).toHaveAttribute('x', '50%');
    expect(text).toHaveAttribute('y', '50%');
    expect(text).toHaveAttribute('alignment-baseline', 'middle');
    expect(text).toHaveAttribute('text-anchor', 'middle');
  });

  test('renders a rectangle with the correct attributes', () => {
    const svg = screen.getByRole('img');

    expect(svg).toHaveAttribute('width', '40');
    expect(svg).toHaveAttribute('width', '40');
  });
});
