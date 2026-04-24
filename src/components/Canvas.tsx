import { ReactElement, useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CanvasProps {
  children?: ReactElement<SVGElement> | ReactElement<SVGElement>[];
}

function Canvas({ children }: CanvasProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const patternGridRef = useRef<SVGPatternElement | null>(null);
  const patternInnerGridRef = useRef<SVGPatternElement | null>(null);
  const groupRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);

    const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.25, 4]).on('zoom', zoomed);

    const patternGrid = d3.select(patternGridRef.current);
    const patternInnerGrid = d3.select(patternInnerGridRef.current);
    const group = d3.select(groupRef.current);

    svg.call(zoom).call(zoom.transform, d3.zoomIdentity.scale(1.5).translate(100, 200));

    function zoomed({ transform }: { transform: d3.ZoomTransform }) {
      const transformInnerGrid = Math.floor(transform.k * 10);
      const transformGrid = transformInnerGrid * 10;

      patternGrid
        .attr('x', Math.floor(transform.x % transformGrid))
        .attr('y', Math.floor(transform.y % transformGrid))
        .attr('width', transformGrid)
        .attr('height', transformGrid);

      patternInnerGrid
        .attr('x', Math.floor(transform.x % transformGrid))
        .attr('y', Math.floor(transform.y % transformGrid))
        .attr('width', transformInnerGrid)
        .attr('height', transformInnerGrid);

      group.attr('transform', transform.toString());
    }

    return () => {
      svg.on('.zoom', null);
    };
  }, []);

  return (
    <svg ref={svgRef} width="100vw" height="100vh" viewBox="0 0 100vw 100vh">
      <defs>
        <pattern id="grid" ref={patternGridRef} patternUnits="userSpaceOnUse" width="100" height="100">
          <rect width="100%" height="100%" fill="#F4F4F4" stroke="lightgray" />
        </pattern>
        <pattern id="inner-grid" ref={patternInnerGridRef} patternUnits="userSpaceOnUse" width="10" height="10">
          <rect width="100%" height="100%" fill="#F4F4F4" stroke="lightgray" />
        </pattern>
      </defs>
      <rect fill="url(#grid)" width="100%" height="100%" />
      <rect fill="url(#inner-grid)" width="100%" height="100%" />
      <g ref={groupRef}>{children}</g>
    </svg>
  );
}

export default Canvas;
