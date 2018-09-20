import { readFileSync, writeFileSync } from "fs";
import * as assert from "assert";
import { validateAndCostBooking } from "./validateBookings";

const FILE_INPUT = "./src/fixtures/input.json";
const FILE_OUTPUT = "./output.json";

console.log(`Hello!   Opening ${FILE_INPUT}...`);
let inputJSON;
try {
  const fileBuffer = readFileSync(FILE_INPUT);
  inputJSON = JSON.parse(fileBuffer.toString());
} catch (e) {
  console.error(`Error:   opening input file. Does ${FILE_INPUT} exist?`);
  console.error(e);
  process.exit(1);
}

assert.ok(
  Array.isArray(inputJSON),
  "Error:   The input file did not contain an array"
);
console.log(
  `Success! Validating and calculating booking costs for ${
    inputJSON.length
  } bookings...`
);

let processedBookings;
try {
  processedBookings = inputJSON.map(booking => validateAndCostBooking(booking));
} catch (e) {
  console.error("There was a problem processing the bookings");
}

console.log(`Success! Writing to ${FILE_OUTPUT}...`);
writeFileSync(FILE_OUTPUT, JSON.stringify(processedBookings, null, 2));
console.log(`Success! File written to ${FILE_OUTPUT}`);
