function initList() {
  return {
    head: null,
    length: 0,
  };
}

function isEmpty(list) {
  return list.length === 0;
}

function add(list, element) {
  const node = { element, next: null };

  if (isEmpty(list)) {
    list.head = node;
  } else {
    let current = list.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = node;
  }

  list.length++;
}

function remove(list, element) {
  let previous = null;
  let current = list.head;

  while (current !== null && current.element !== element) {
    previous = current;
    current = current.next;
  }

  if (current === null) return;

  if (previous !== null) {
    previous.next = current.next;
  } else {
    list.head = current.next;
  }

  list.length--;
}

function contains(list, element) {
  if (isEmpty(list)) {
    return false;
  }
  let current = list.head;
  while (current !== null) {
    if (current.element === element) {
      return true;
    }
    current = current.next;
  }
  return false;
}

function getAt(list, index) {
  if (isEmpty(list)) {
    return;
  }
  let counter = 0;
  let current = list.head;
  while (current !== null) {
    if (counter === index) {
      return current.element;
    }
    counter++;
    current = current.next;
  }
  return;
}

function insertAt(list, index, element) {
  const node = { element: element, next: null };
  if (isEmpty(list)) {
    return add(list, element);
  }
  let counter = 0;
  let current = list.head;
  let previous = null;
  if (index === counter && counter === 0) {
    node.next = list.head;
    list.head = node;
    list.length++;
    return;
  }
  while (current !== null) {
    if (index === counter) {
      previous.next = node;
      node.next = current;
      list.length++;
      return;
    }
    previous = current;
    current = current.next;
    counter++;
  }
  if (current === null && index === list.length) {
    previous.next = node;
    list.length++;
    return;
  }
}

function removeAt(list, index) {
  let counter = 0;
  let current = list.head;
  let previous = null;

  if (index >= list.length) {
    return;
  }
  while (current !== null) {
    if (index === counter) {
      if (index === 0) {
        list.head = current.next;
      } else {
        previous.next = current.next;
      }
      list.length--;
      return;
    }
    previous = current;
    current = current.next;
    counter++;
  }
}

function clear(list) {
  list.head = null;
  list.length = 0;
  return;
}

const myList = initList();

add(myList, 23);
add(myList, 55);
add(myList, 99);
console.log(myList, "\n");
// removeAt(myList, 1)
removeAt(myList, 0);
// removeAt(myList, 0)
clear(myList);
console.log(myList, "\n");
