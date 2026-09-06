import { createHmac, randomBytes, createCipheriv, createDecipheriv } from 'node:crypto'

const hashedMessage = createHmac("sha256", "secretKey")
  .update("important-secret-message")
  .digest("hex");

console.log({ hashedMessage: hashedMessage });