function Rectangle({ num }: { num: number }) {
  return (
    <svg width="40" height="40" role="img">
      <g>
        <rect width="40" height="40" fill="none" stroke="black" />
        <text
          x="50%"
          y="50%"
          alignmentBaseline="middle"
          textAnchor="middle"
          fontFamily="Verdana"
          fontSize="12"
          fill="black"
          data-testid="rectangle"
        >
          {num}
        </text>
      </g>
    </svg>
  );
}

export default Rectangle;
