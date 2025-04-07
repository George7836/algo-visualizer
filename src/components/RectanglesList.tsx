import { Fragment } from 'react/jsx-runtime';
import { colorRectangle } from '../utils/color';

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

        return (
          <Fragment key={`${number}-${index}`}>
            <rect stroke="black" fill={rectangleColor} x={index * 40} y={0} width={40} height={40}></rect>
            <text x={index * 40 + 20} y={22} textAnchor="middle" dominantBaseline="middle">
              {number}
            </text>
            <text fill="gray" x={index * 40 + 20} y={55} textAnchor="middle" dominantBaseline="middle">
              {index}
            </text>
          </Fragment>
        );
      })}
    </svg>
  );
}

export default RectanglesList;
