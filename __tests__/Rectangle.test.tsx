import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Rectangle from '../src/components/Rectangle';

describe('Rectangle Component', () => {
  beforeEach(() => {
    render(<Rectangle num={5} color="blue" index={0} />);
  });

  test('renders the text with the correct number', () => {
    const text = screen.getByTestId('text');

    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('5');
  });

  test('number is centered within the rectangle', () => {
    const text = screen.getByTestId('text');

    expect(text).toHaveAttribute('dominant-baseline', 'middle');
    expect(text).toHaveAttribute('text-anchor', 'middle');
  });

  test('renders a rectangle with the correct attributes', () => {
    const svg = screen.getByTestId('rectangle');

    expect(svg).toHaveAttribute('width', '40');
    expect(svg).toHaveAttribute('width', '40');
  });
});
