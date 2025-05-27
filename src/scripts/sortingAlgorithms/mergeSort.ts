import { SortFunction } from "../../types/sortingTypes";

const mergeSort: SortFunction = (arr) => {
  const steps: number[][] = [];
  const array = [...arr];

  const merge = (start: number, mid: number, end: number) => {
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        array[k++] = left[i++];
      } else {
        array[k++] = right[j++];
      }
      steps.push([...array]);
    }

    while (i < left.length) {
      array[k++] = left[i++];
      steps.push([...array]);
    }

    while (j < right.length) {
      array[k++] = right[j++];
      steps.push([...array]);
    }
  };

  const mergeSortRecursive = (start: number, end: number) => {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    mergeSortRecursive(start, mid);
    mergeSortRecursive(mid + 1, end);
    merge(start, mid, end);
  };

  mergeSortRecursive(0, array.length - 1);
  return steps;
};

export default mergeSort;
