import { colorRectangle } from '../utils/color';
import Rectangle from './Rectangle';

interface RectanglesListProps {
  numbers: number[];
  interval: {
    start: number;
    end: number;
  } | null;
  guess: number | null;
}

function RectanglesList({ numbers, guess, interval }: RectanglesListProps) {
  return (
    <svg>
      {numbers.map((number, index) => {
        const rectangleColor = colorRectangle(number, index, guess, interval);

        return <Rectangle key={`${number}-${index}`} num={number} index={index} color={rectangleColor} />;
      })}
    </svg>
  );
}

export default RectanglesList;
