interface RectangleProps {
  num: number;
  index: number;
  color: string;
}

function Rectangle({ num, index, color }: RectangleProps) {
  return (
    <g data-testid="rectangle-group">
      <rect stroke="black" fill={color} x={index * 40} y={0} width={40} height={40} data-testid="rectangle"></rect>
      <text x={index * 40 + 20} y={22} textAnchor="middle" dominantBaseline="middle" data-testid="text">
        {num}
      </text>
      <text fill="gray" x={index * 40 + 20} y={55} textAnchor="middle" dominantBaseline="middle">
        {index}
      </text>
    </g>
  );
}

export default Rectangle;
