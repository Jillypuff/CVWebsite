import { SortFunction } from "../../types/sortingTypes";

const insertionSort: SortFunction = (arr) => {
  const a = [...arr];
  const steps = [a.slice()];

  for (let i = 1; i < a.length; i++) {
    let j = i;
    while (j > 0 && a[j - 1] > a[j]) {
      [a[j], a[j - 1]] = [a[j - 1], a[j]];
      steps.push(a.slice());
      j--;
    }
  }

  return steps;
};

export default insertionSort;
