function initQueue() {
  return {
    collection: [],
  };
}

function print(queue) {
  console.log(queue.collection);
}

function enqueue(queue, element) {
  queue.collection.unshift(element);
  return queue;
}

const myQueue = initQueue();
print(myQueue);
enqueue(myQueue, "Apple");
enqueue(myQueue, "Orange");
enqueue(myQueue, "Peach");
enqueue(myQueue, "Ananas");
print(myQueue);

function dequeue(queue) {
  return queue.collection.pop();
}

dequeue(myQueue);
print(myQueue);
console.log(dequeue(myQueue));
print(myQueue);
enqueue(myQueue, "CocaCola");
print(myQueue);
const my2ndQueue = initQueue();
print(my2ndQueue);
enqueue(my2ndQueue, "Italy");
enqueue(my2ndQueue, "France");
enqueue(my2ndQueue, "UK");
print(my2ndQueue);

function front(queue) {
  return queue.collection[queue.collection.length - 1];
}

console.log(front(my2ndQueue));

function size(queue) {
  return queue.collection.length;
}

function isEmpty(queue) {
  return queue.collection.length === 0;
}
