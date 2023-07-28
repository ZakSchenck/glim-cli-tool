#!/usr/bin/env node
const { generateKeyPairSync } = require("ssh-keygen");

const characters =
  "!@#$%^&*(!@#$%^&*()abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
const symbolCharacters = "!@#$%^&*(";
const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "1234567890";
const crypto = require("crypto");

/**
 * Get a securely random int to increase password strength
 * @returns {number}
 */
const secureRandomInt = (min, max) => {
  // Calculate the range (inclusive)
  const range = max - min + 1;

  const randomBytes = crypto.randomBytes(4); // 4 bytes for a 32-bit integer

  const randomValue = Math.abs(randomBytes.readInt32BE() % range);

  return min + randomValue;
};

// Generates random API Key
const generateRandomApiKey = () => {
  const apiKeyPassword = [];
  // Loop 52 times for 52 characters
  for (let i = 1; i < 52; i++) {
    // Get random index by calling secureRandomInt
    const randomIndex = secureRandomInt(0, characters.length - 1);

    // Push each character to array
    apiKeyPassword.push(characters[randomIndex]);
  }

  console.log(apiKeyPassword.join(""));
};

/**
 * Generate random SSH Key
 * @param {number} bits
 */
const generateRandomSshKey = (bits) => {
  try {
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: bits,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });

    console.log("Private Key:\n", privateKey);
    console.log("Public Key:\n", publicKey);
  } catch (err) {
    console.error("Ran into an error when generating SSH key:", err);
  }
};

const generateRandomSitePassword = (passwordLength) => {
  const sitePassword = [];
  for (let i = 0; i < passwordLength; i++) {
    // Get random index by calling secureRandomInt
    const randomIndex = secureRandomInt(0, characters.length - 1);

    // Push each character to array
    sitePassword.push(characters[randomIndex]);
  }

  console.log(sitePassword.join(''));
};

module.exports = {
  generateRandomApiKey,
  generateRandomSshKey,
  generateRandomSitePassword,
};
