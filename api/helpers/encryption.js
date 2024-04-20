require('dotenv').config();
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const SECRET_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const IV = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

// Encryption function
function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(SECRET_KEY), IV);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

// Decryption function
function decrypt(text) {
  let encryptedText = Buffer.from(text, 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(SECRET_KEY), IV);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = {
  encrypt,
  decrypt,
};
