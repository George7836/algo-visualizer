import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

enum RECTANGLE_STATE {
  SELECTED = 'selected',
  SORTED_OUT = 'sorted-out',
}

interface Rectangle {
  value: number;
  state: RECTANGLE_STATE;
}

interface RectanglesListProps {
  rectangles: Rectangle[];
}

function RectanglesList({ numbers }: { numbers: number[] }) {
  const listRef = useRef(null);

  useEffect(() => {
    if (!listRef.current) return;

    const svg = d3.select<SVGSVGElement, unknown>(listRef.current);
    const rectangles = svg.selectAll('rect').data(numbers);

    rectangles
      .enter()
      .append('rect')
      .style('stroke', 'black')
      .style('fill', 'none')
      .attr('x', (_d, i) => i * 50)
      .attr('y', 0)
      .attr('width', 40)
      .attr('height', 40);

    rectangles
      .enter()
      .append('text')
      .attr('x', (_d, i) => i * 50 + 20)
      .attr('y', 22)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .text((d) => d);

    rectangles
      .enter()
      .append('text')
      .attr('x', (_d, i) => i * 50 + 20)
      .attr('y', 55)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .text((_d, i) => i);
  }, [numbers]);

  return <svg ref={listRef}></svg>;
}

export default RectanglesList;
