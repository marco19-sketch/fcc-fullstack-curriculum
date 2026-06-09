function selectionSort(array) {
  let i = 0;
  while (i < array.length - 1) {
    let j = i + 1;
    while (j < array.length) {
      if (array[j] < array[i]) {
        [array[j], array[i]] = [array[i], array[j]];//swapping
      }
      j++;
    }
    i++;
  }
  return array;
}

console.log(
  selectionSort([
    1, 9, 10, 1, 2, 4, 2, 1, 7, 6, 2, 1, 14, 9, 3, 6, 89, 234, 12,
  ]),
);

selectionSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92])
console.log(selectionSort([1, 9, 10, 1, 2, 4, 2, 1, 7, 6, 2, 1, 14, 9]));

console.log(
  selectionSort([
    1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92,
  ]),
);
console.log(selectionSort([4, 1, 7, 2, 9, 1]));

const unorderedArray = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 100) + 1,
);

console.log(selectionSort(unorderedArray));
