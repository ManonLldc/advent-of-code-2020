const fs = require('fs');

/**
 * Reads the file and returns an array of objects:
 * [
 *   { firstIndex: 1, secondIndex: 3, letter: 'a', password: 'abcdeest' },
 *   ...
 * ]
 */
function readPasswordFile() {
    const data = fs.readFileSync('data.txt', 'utf-8');
    return data
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => {
            const [range, letterWithColon, password] = line.split(' ');
            const [firstIndex, secondIndex] = range.split('-').map(Number);
            const letter = letterWithColon.replace(':', '');

            return { firstIndex, secondIndex, letter, password };
        });
}

/**
 * Checks each password according to the following rule.
 * Counts how many are valid and displays the result.
 */
function findValidPasswords(data) {
    let validPasswordCount = 0;

    data.forEach(entry => {
        const firstIndexMatch = entry.password[entry.firstIndex - 1] === entry.letter;
        
        const secondIndexMatch = entry.password[entry.secondIndex - 1] === entry.letter;

        if (firstIndexMatch !== secondIndexMatch) {
            console.log(`Mot de passe valide : ${entry.password} (lettre '${entry.letter}')`);
            validPasswordCount++;
        } else {
            console.log(`Mot de passe invalide : ${entry.password} (lettre '${entry.letter}')`);
        }
    });

    console.log(`Nombre total de mots de passe valides : ${validPasswordCount}`);
}

// Main execution
const passwordEntries = readPasswordFile();
findValidPasswords(passwordEntries);
