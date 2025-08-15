const fs = require('fs');

/**
 * Reads the input file, trims and filters empty lines.
 */
function readInputLines() {
  return fs.readFileSync('data.txt', 'utf-8')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

/**
 * Counts the number of trees ('#') encountered following a slope on a map.
 */
function countTreesOnSlope(mapLines, rightStep = 3, downStep = 1) {
  const map = mapLines.map(line => line.split(''));
  
  let x = 0;
  let treeCount = 0;

  for (let y = 0; y < map.length; y += downStep) {
    if (map[y][x % map[y].length] === '#') {
      treeCount++;
    }
    x += rightStep;
  }
  
  return treeCount;
}

// Main execution
const mapLines = readInputLines();
const numberOfTrees = countTreesOnSlope(mapLines);

console.log(`Nombre d'arbres rencontrés : ${numberOfTrees}`);

// Part 2 - Different slopes to check
const treesSlope1Right1Down1 = countTreesOnSlope(mapLines, 1, 1);
const treesSlope3Right1Down1 = countTreesOnSlope(mapLines, 3, 1);
const treesSlope5Right1Down1 = countTreesOnSlope(mapLines, 5, 1);
const treesSlope7Right1Down1 = countTreesOnSlope(mapLines, 7, 1);
const treesSlope1Right2Down = countTreesOnSlope(mapLines, 1, 2);

const totalTreesProduct =
  treesSlope1Right1Down1 *
  treesSlope3Right1Down1 *
  treesSlope5Right1Down1 *
  treesSlope7Right1Down1 *
  treesSlope1Right2Down;

console.log(`Produit des arbres rencontrés : ${totalTreesProduct}`);

