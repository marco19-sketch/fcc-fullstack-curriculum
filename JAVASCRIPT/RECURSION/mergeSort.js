const mergeSort = arr => {
  // dividing the array until getting one element arrays ************************
  if (arr.length <= 1) {
    return arr;
  }
  
  const mid = Math.floor(arr.length / 2);
  
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  // sorting the arrays ********************************************************
  const sorted = [];
  let i = 0;
  let j = 0;
  console.log('left array: ', left)
  console.log('right array: ', right)
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]){
        sorted.push(left[i])
        i++
    } else {
        sorted.push(right[j])
        j++
    }
    console.log('sorted: ', sorted)
  }
  // concatenating the sorted array with remaining parts of left & right arrays *******
  return sorted.concat(left.slice(i)).concat(right.slice(j))
};

console.log(mergeSort([4, 1, 3, 5, 2]))
