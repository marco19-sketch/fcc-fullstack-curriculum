const crypto = require("crypto");

const hashedPassword = crypto
  .createHash("sha256")
  .update("myStrongPassword")
  .digest("hex");

console.log({ hashedPassword: hashedPassword });

const hashedMessage = crypto
  .createHmac("sha256", "secretKey")
  .update("important-secret-message")
  .digest("hex");

console.log({ hashedMessage: hashedMessage });

console.log("##################################################");
// A key must match the algorithm length. Here AES-256 is 32 bytes
const key = Buffer.from("12345678901234567890123456789012");

// A fixed IV, 16 bytes for AES
const iv = Buffer.from("1234567890123456");

const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

let encrypted = cipher.update("Hello campers!", "utf8", "hex");
encrypted += cipher.final("hex");

console.log("Encrypted data:", encrypted);

// Decrypt the "Hello campers!" message
const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf8");

console.log("Decrypted data:", decrypted);
console.log("##########################################################\n\n");

console.log("Random Bytes:", crypto.randomBytes(16));
console.log("Random Bytes:", crypto.randomBytes(16).toString("hex"));
console.log("Random Int:", crypto.randomInt(0, 10000));
const secret = crypto.createSecretKey(crypto.randomBytes(32));
console.log('secret',secret);
console.log('secret export',secret.export());
console.log('secret export string',secret.export().toString('hex'));