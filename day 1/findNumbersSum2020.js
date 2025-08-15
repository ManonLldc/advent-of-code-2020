/**
 * --------------------------------------------------------
 * Script to find numbers whose sum equals 2020.
 *
 * Description:
 *  - The goal is to find:
 *      - Two numbers whose sum = 2020 and display their product.
 *      - Three numbers whose sum = 2020 and display their product.
 *
 * Objective:
 *  - Iterate over all possible combinations.
 *  - Stop the search as soon as a combination is found.
 * --------------------------------------------------------
 */

const fs = require('fs');

// Read the file and convert it into an array of numbers
const data = fs.readFileSync('data.txt', 'utf-8');
const numbers = data
    .split('\n')
    .map(line => parseInt(line, 10))
    .filter(num => !isNaN(num));

/**
 * Find two numbers whose sum = 2020.
 * Returns and logs their product.
 */
function findTwoNumbersWithSum2020(numbers) {
    for (let i = 0; i < numbers.length - 1; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === 2020) {
                const product = numbers[i] * numbers[j];
                console.log(`Deux nombres trouvés: ${numbers[i]} + ${numbers[j]} = 2020`);
                console.log(`Produit des deux nombres = ${product}`);
                return product;
            }
        }
    }
    console.log("Aucune combinaison trouvée.");
    return null;
}

/**
 * Find three numbers whose sum = 2020.
 * Returns and logs their product.
 */
function findThreeNumbersWithSum2020(numbers) {
    for (let i = 0; i < numbers.length - 2; i++) {
        for (let j = i + 1; j < numbers.length - 1; j++) {
            for (let k = j + 1; k < numbers.length; k++) {
                if (numbers[i] + numbers[j] + numbers[k] === 2020) {
                    const product = numbers[i] * numbers[j] * numbers[k];
                    console.log(`Trois nombres trouvés: ${numbers[i]} + ${numbers[j]} + ${numbers[k]} = 2020`);
                    console.log(`Produit des trois nombres = ${product}`);
                    return product;
                }
            }
        }
    }
    console.log("Aucune combinaison trouvée.");
    return null;
}

// Main execution

// Part 1 : Two numbers version
findTwoNumbersWithSum2020(numbers);

// Part 2 : Three numbers version
findThreeNumbersWithSum2020(numbers);
