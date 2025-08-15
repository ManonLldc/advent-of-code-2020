/**
 * Password validator (count-based policy)
 * - Reads "data.txt" containing password policies and passwords.
 * - Policy format: "min-max letter: password"
 * - A password is valid if the letter occurs between min and max times.
 */

const fs = require('fs');

/** Reads and parses the file. */
function readPasswordFile() {
    const data = fs.readFileSync('data.txt', 'utf-8');
    return data
        .split('\n')
        .map(line => {
            const match = line.trim().match(/^(\d+)-(\d+)\s+([a-z]):\s+(.+)$/);
            return {
                min: parseInt(match[1], 10),
                max: parseInt(match[2], 10),
                letter: match[3],
                password: match[4]
            };
        });
}

/**
 * Checks each password and counts how many are valid.
 */
function findValidPasswords(passwordEntries) {
    let validPasswordCount = 0;

    passwordEntries.forEach(entry => {
        let occurrence = 0;
        for (const char of entry.password) {
            if (char === entry.letter) occurrence++;
        }

        if (occurrence >= entry.min && occurrence <= entry.max) {
            console.log(`Mot de passe valide : ${entry.letter} ${entry.min}-${entry.max} : ${entry.password}`);
            validPasswordCount++;
        } else {
            console.log(`Mot de passe invalide : ${entry.letter} ${entry.min}-${entry.max} : ${entry.password}`);
        }
    });

    console.log(`Nombre total de mots de passe valides : ${validPasswordCount}`);
}

// Main execution
const passwordEntries = readPasswordFile();
findValidPasswords(passwordEntries);
