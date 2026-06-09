const quicksort = array => {
  console.log("array", array);
  if (array.length <= 1) {
    return array;
  }
  const mid = Math.floor(array.length / 2);
  const left = quicksort(array.slice(0, mid));
  const right = quicksort(array.slice(mid));
  console.log({ mid: mid, left: left, right: right }); // logs ******************

  const sorted = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    console.log({ left_i: left[i], right_j: right[j] }); // logs ****************
    if (left[i] < right[j]) {
      sorted.push(left[i]);
      i++;
    } else {
      sorted.push(right[j]);
      j++;
    }
  }
  // logs **************************************************************************
  console.log({
    sorted: sorted,
    leftSlice: left.slice(i),
    rightSlice: right.slice(j),
  }); 
  // ********************************************************************************
  return sorted.concat(left.slice(i)).concat(right.slice(j));
};

console.log(quicksort([8, 4, 2, 1, 345, 3, 6]));
console.log(
  quicksort([
    1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92,
  ]),
);
