import { useCallback, useRef, useState } from 'react';

export function useGeneratorExecutor<Value, Return>(
  next: () => IteratorResult<Value, Return> | null,
  interval: number = 200,
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  const play = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setIsPlaying(true);

    intervalRef.current = setInterval(() => {
      const value = next();
      if (intervalRef.current && value?.done) {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
      }
    }, interval);
  }, [next, interval]);

  const pause = useCallback(() => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    setIsPlaying(false);
  }, []);

  return { play, pause, isPlaying };
}
