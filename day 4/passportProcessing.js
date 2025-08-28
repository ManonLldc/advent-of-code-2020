const fs = require('fs');

/**
 * Reads the input file, splits it into passport blocks,
 * and normalizes the format by replacing newlines inside
 * each passport with spaces.
 */
function readInputLines() {
  return fs.readFileSync('data.txt', 'utf-8')
    .trim()
    .split(/\r?\n\s*\r?\n/)
    .map(block => block.replace(/\r?\n/g, " "));
}

/**
 * Checks if a passport contains all required fields.
 * The "cid" field is optional and ignored for validation.
 */
function isValidPassport(passport) {
  const requiredFields = ["byr", "iyr", "eyr", "hcl", "ecl", "pid","hgt"];
  return requiredFields.every(field => passport.includes(field + ":"));
}

/**
 * Counts how many passports in the given dataset are valid
 * based on the presence of required fields.
 */
function passportProcessing(data) {
  return data.reduce(
    (count, passport) => count + (isValidPassport(passport) ? 1 : 0),
    0
  );
}


// Main execution
const data = readInputLines();
const nbPassportValide = passportProcessing(data);
console.log(`Nombre de passeports valides : ${nbPassportValide}`);
