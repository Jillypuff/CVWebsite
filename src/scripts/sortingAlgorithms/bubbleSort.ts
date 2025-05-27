import { SortFunction } from '../../types/sortingTypes';

const bubbleSort: SortFunction = (arr) => {
    const a = [...arr];
    const steps = [a.slice()];

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
                steps.push(a.slice());
            }
        }
    }

    return steps;
};

export default bubbleSort;