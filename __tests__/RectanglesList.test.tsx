import { render, screen } from '@testing-library/react';
import RectanglesList from '../src/components/RectanglesList';

describe('RectangleList', () => {
  test('renders passed numbers as rectangles', () => {
    render(<RectanglesList numbers={[1, 2, 3]} guess={2} interval={{ start: 0, end: 2 }} />);

    screen.debug();

    const retangles = screen.queryAllByTestId('rectangle-group');

    expect(retangles.length).toBe(3);
  });
});
