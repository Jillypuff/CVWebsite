import { SortFunction } from "../../types/sortingTypes";

const heapSort: SortFunction = (arr) => {
  const steps: number[][] = [];
  const array = [...arr];

  const heapify = (n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
      largest = left;
    }

    if (right < n && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      steps.push([...array]);
      heapify(n, largest);
    }
  };

  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    steps.push([...array]);
    heapify(i, 0);
  }

  return steps;
};

export default heapSort;
