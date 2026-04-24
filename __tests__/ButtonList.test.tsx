import { fireEvent, render, screen } from '@testing-library/react';
import { useGeneratorExecutor } from '../src/hooks/useGeneratorExecutor';
import '@testing-library/jest-dom';
import ButtonList from '../src/components/ButtonList';

jest.mock('../src/hooks/useGeneratorExecutor', () => ({
  useGeneratorExecutor: jest.fn(),
}));

describe('buttons', () => {
  const mockNext = jest.fn();
  const mockBack = jest.fn();
  const mockPlay = jest.fn();
  const mockPause = jest.fn();

  const renderComponent = (isPlaying: boolean = false) => {
    (useGeneratorExecutor as jest.Mock).mockReturnValue({
      play: mockPlay,
      pause: mockPause,
      isPlaying,
    });

    return render(<ButtonList next={mockNext} back={mockBack} />);
  };

  test('displays buttons "next", "back" and "play"', () => {
    renderComponent();

    const nextButton = screen.getByTestId('next');
    const backButton = screen.getByTestId('back');
    const playButton = screen.getByTestId('play');

    expect(backButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
  });

  test('displays "play" button, if isPlaying=false', () => {
    renderComponent(false);

    const playButton = screen.getByTestId('play');
    const pauseButton = screen.queryByTestId('pause');

    expect(playButton).toBeInTheDocument();
    expect(pauseButton).not.toBeInTheDocument();
  });

  test('displays "pause" button, if isPlaying=true', () => {
    renderComponent(true);

    const pauseButton = screen.getByTestId('pause');
    const playButton = screen.queryByTestId('play');

    expect(pauseButton).toBeInTheDocument();
    expect(pauseButton).toHaveClass('is-playing');
    expect(playButton).not.toBeInTheDocument();
  });

  test('invokes "back" function clicking on "back" button', () => {
    renderComponent();

    const backButton = screen.getByTestId('back');

    fireEvent.click(backButton);

    expect(mockBack).toHaveBeenCalled();
  });

  test('invokes "next" function clicking on "next" button', () => {
    renderComponent();

    const nextButton = screen.getByTestId('next');

    fireEvent.click(nextButton);

    expect(mockNext).toHaveBeenCalled();
  });

  test('invokes "play" function clicking on "play" button', () => {
    renderComponent();

    const playButton = screen.getByTestId('play');

    fireEvent.click(playButton);

    expect(mockPlay).toHaveBeenCalled();
  });

  test('invokes "pause" function clicking on "pause" button', () => {
    renderComponent(true);

    const pauseButton = screen.getByTestId('pause');

    fireEvent.click(pauseButton);

    expect(mockPause).toHaveBeenCalled();
  });
});
