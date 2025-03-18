function Rectangle({ num }: { num: number }) {
  return (
    <svg width="40" height="40">
      <g>
        <rect width="40" height="40" fill="none" stroke="black" />
        <text
          x="50%"
          y="50%"
          alignment-baseline="middle"
          text-anchor="middle"
          font-family="Verdana"
          font-size="12"
          fill="black"
        >
          {num}
        </text>
      </g>
    </svg>
  );
}

export default Rectangle;
