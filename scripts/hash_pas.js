const {scryptSync} = require("crypto")

console.log(scryptSync("123123", 'cf74aad2ce94f1885c7c290a82816064', 64).toString('hex'))