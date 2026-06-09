function insertionSort(array) {
  let i = 0;
  while (i < array.length) {
    let j = 0;
    while (j <= i) {
      if (array[j] > array[i]) {
        [array[i], array[j]] = [array[j], array[i]];//swapping
      }
      j++;
    }
    i++;
  }
  return array;
}

const test = insertionSort([
  1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92,
]);

console.log(test)
