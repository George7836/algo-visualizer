import './App.css';
import Canvas from './components/Canvas';
import RectanglesList from './components/RectanglesList';
import { useGenerator } from './hooks/useGenerator';
import { binarySearch } from './utils/binarySearch';
import ButtonList from './components/ButtonList';

const SEARCH_VALUE = 3;
const SORTED_NUMBERS = [1, 3, 7, 8, 10, 12, 13, 17, 25, 27, 29, 35, 40, 45];

function App() {
  const { iteratorResult, next, back } = useGenerator(binarySearch(SORTED_NUMBERS, SEARCH_VALUE));

  const isGeneratorDone = iteratorResult?.done;
  const canPassValue = !isGeneratorDone && iteratorResult?.value;

  const guess = canPassValue ? iteratorResult.value.guess : null;
  const interval = canPassValue ? { start: iteratorResult.value.start, end: iteratorResult.value.end } : null;

  return (
    <div className="wrapper">
      <ButtonList next={next} back={back} />
      <Canvas>
        <text y={-20}>Looking for: {SEARCH_VALUE}</text>
        <RectanglesList
          numbers={SORTED_NUMBERS}
          guess={isGeneratorDone ? SEARCH_VALUE : guess}
          interval={isGeneratorDone ? { start: iteratorResult.value, end: iteratorResult.value } : interval}
        />
      </Canvas>
    </div>
  );
}

export default App;
