import { useGeneratorExecutor } from '../hooks/useGeneratorExecutor';
import arrowIcon from '../assets/arrow.svg';
import playIcon from '../assets/play.svg';
import pauseIcon from '../assets/pause.svg';

interface ButtonListProps<Value, Return> {
  next: () => IteratorResult<Value, Return> | null;
  back: () => IteratorResult<Value, Return> | null;
}

function ButtonList<Value, Return>({ next, back }: ButtonListProps<Value, Return>) {
  const { play, pause, isPlaying } = useGeneratorExecutor(next, 1000);

  return (
    <div className="button-list">
      <button data-testid="back" onClick={() => back()}>
        <img src={arrowIcon} width={30} height={30} />
      </button>
      <button data-testid="next" onClick={() => next()}>
        <img src={arrowIcon} width={30} height={30} className="arrow-next-icon" />
      </button>
      {isPlaying ? (
        <button data-testid="pause" onClick={() => pause()} className="is-playing">
          <img src={pauseIcon} width={25} height={25} />
        </button>
      ) : (
        <button data-testid="play" onClick={() => play()}>
          <img src={playIcon} width={25} height={25} />
        </button>
      )}
    </div>
  );
}

export default ButtonList;
