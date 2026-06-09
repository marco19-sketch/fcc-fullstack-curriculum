const initStack = () => {
  return {
    collection: [],
  };
};

const push = (stack, element) => {
  stack.collection.push(element);
};

const myStack = initStack();
console.log(myStack, "\n");
push(myStack, "Apple");
push(myStack, "Banana");
push(myStack, "Peach");
console.log(myStack, "\n");

const pop = stack => {
  return stack.collection.pop();
};

console.log(pop(myStack), "\n");
console.log(myStack, "\n");

const peek = stack => {
  return stack.collection[stack.collection.length - 1];
};

console.log(peek(myStack), "\n");

const isEmpty = stack => {
  return stack.collection.length === 0;
};

console.log(isEmpty(myStack), "\n");

const clear = stack => {
  stack.collection = [];
};

console.log(myStack, "\n");

clear(myStack);

console.log(myStack);
