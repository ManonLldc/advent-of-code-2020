const fs = require('fs');
const path = require('path');

/**
 * Reads the input file, splits it into lines, trims whitespace,
 * and removes empty lines.
 *
 * @returns {string[]} Array of cleaned, non-empty lines.
 */
function readInputLines() {
  return fs.readFileSync('data.txt', 'utf-8')
    .split(/\r?\n/)        // handles both Windows (\r\n) and Unix (\n) line endings
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

/**
 * Extends each line to at least the given width by repeating it.
 *
 * @param {string[]} lines - Original map lines
 * @param {number} minWidth - Minimum desired width
 * @returns {string[]} Extended map lines
 */
function extendLines(lines, minWidth) {
  return lines.map(line => {
    const repeatCount = Math.ceil(minWidth / line.length);
    return line.repeat(repeatCount);
  });
}

/**
 * Traverses a 2D map with given steps, annotates visited positions,
 * and counts encountered trees.
 *
 * @param {string[][]} mapArray - 2D character grid of the map
 * @param {number} rightStep - Horizontal step size
 * @param {number} downStep - Vertical step size
 * @returns {{ annotatedMap: string[][], treeCount: number }} Annotated map and tree count
 */
function annotateMap(mapArray, rightStep, downStep) {
  let posX = 0;
  let treeCount = 0;
  const height = mapArray.length;

  for (let posY = 0; posY < height; posY += downStep) {
    if (posY === 0) {
      posX += rightStep;
      continue; // skip the first row
    }

    const currentChar = mapArray[posY][posX];
    if (currentChar === '#') {
      mapArray[posY][posX] = '🌳';
      treeCount++;
    } else if (currentChar === '.') {
      mapArray[posY][posX] = '❌';
    }
    posX += rightStep;
  }

  return { annotatedMap: mapArray, treeCount };
}

// Movement parameters
const STEP_RIGHT = 3;
const STEP_DOWN = 1;

/**
 * Main program execution.
 * Reads the map, extends it, traverses it, annotates visited positions,
 * saves results to files, and prints summary information.
 */
function main() {
  const inputLines = readInputLines();
  const mapHeight = inputLines.length;

  const minWidth = STEP_RIGHT * mapHeight;
  const extendedLines = extendLines(inputLines, minWidth);

  fs.writeFileSync('extended-map.txt', extendedLines.join('\n'), 'utf-8');

  const mapArray = extendedLines.map(line => line.split(''));
  const { annotatedMap, treeCount } = annotateMap(mapArray, STEP_RIGHT, STEP_DOWN);

  const annotatedOutput = annotatedMap.map(line => line.join('')).join('\n');
  fs.writeFileSync('annotated-map.txt', annotatedOutput, 'utf-8');

  console.log('Trees encountered:', treeCount);
  console.log("Extended map saved to: extended-map.txt");
  console.log("Annotated map saved to: annotated-map.txt");
}

main();
