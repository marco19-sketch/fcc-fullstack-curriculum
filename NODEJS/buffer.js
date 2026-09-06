import { Buffer } from "buffer";

// Create a buffer from a string
const myStrBuffer = Buffer.from("freeCodeCamp");
console.log(myStrBuffer);
console.log(myStrBuffer[0]);
console.log(myStrBuffer.toString());

// Create a buffer from an array of numbers
const myNumBuffer = Buffer.from([
  70, 82, 69, 69, 67, 79, 68, 69, 67, 65, 77, 80,
]);

console.log(myNumBuffer);
console.log(myNumBuffer[0]);
console.log(myNumBuffer.toString());

// Nr of bytes needed for the string
console.log(Buffer.byteLength("Hello freeCodeCamp"));
