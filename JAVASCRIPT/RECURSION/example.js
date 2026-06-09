const recursiveCountdown = number => {
  if (number < 1) {
    return;
  }
  console.log('before the call stack',number)// before call stack
  recursiveCountdown(number - 1);
  console.log('call stack return',number); //call stack return
};

recursiveCountdown(5);
