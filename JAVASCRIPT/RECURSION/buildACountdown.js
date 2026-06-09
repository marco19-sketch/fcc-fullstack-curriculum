
  //create a closure so the helper has access to the array const
  //create a helper recursive function

  //closure
  const countdown = n => {
    const array = [];
    if (n < 1) return array;

    //helper recursive function
    function helper(n) {
      if (n < 1) return;
      console.log(n)
      helper(n - 1);
    }
    //call the helper function
    helper(n);
    return array;
  };

  const result = countdown(12);
  console.log(result);

