import { RECTANGLE_STATUS } from '../types/status';

export const RECTANGLE_COLORS: Record<RECTANGLE_STATUS, string> = {
  [RECTANGLE_STATUS.GUESS]: 'red',
  [RECTANGLE_STATUS.REST]: 'rgb(136, 162, 245)',
  [RECTANGLE_STATUS.IRRELEVANT]: 'none',
  [RECTANGLE_STATUS.FOUND]: 'green',
};

export function colorRectangle(
  value: number,
  valueIndex: number,
  guess: number | null,
  interval: { start: number; end: number } | null,
) {
  if (!guess || !interval) return RECTANGLE_COLORS.rest;
  if (value === guess) return RECTANGLE_COLORS.guess;
  if (valueIndex >= interval.start && valueIndex <= interval.end) return RECTANGLE_COLORS.rest;

  return RECTANGLE_COLORS.irrelevant;
}
