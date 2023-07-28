#!/usr/bin/env node
const { generateRandomApiKey, generateRandomSshKey, generateRandomSitePassword } = require('./passwords.js');

// Fetch command line arguments
const args = process.argv.slice(2);

// Check the first argument
let command = args[0];

// Generate random API Key
if (command === "apikey") { 
    generateRandomApiKey();
    process.exit(0)
}
// Generate random SSH Key with 2048 bits in length
else if (command === "sshkey" || command === "sshkey 2048") {
    generateRandomSshKey(2048);
    process.exit(0)
}
// Generate random SSH Key with 4096 bits in length
else if (command === "sshkey 4096") {
    generateRandomSshKey(4096);
    process.exit(0);
}
command = process.argv[2];
// Generate random normal password
if (command.startsWith("pw-all") || command.startsWith("pw-")) {
    const passwordLength = command.slice(-2);
    generateRandomSitePassword(passwordLength);
    process.exit(0);
}
