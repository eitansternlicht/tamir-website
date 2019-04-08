import XLSX from 'xlsx';

const isDigit = c => c >= '0' && c <= '9';

const reverseString = str =>
  str
    .split('')
    .reverse()
    .join('');

const splitAtPredicate = (predicate, str) => {
  for (let i = 0; i < str.length; i++) {
    if (predicate(str[i])) {
      return [str.slice(0, i), str.slice(i)];
    }
  }
};

const lettersToNum = letters => {
  let reversed = reverseString(letters);
  let num = reversed.charCodeAt(0) - 'A'.charCodeAt(0);
  for (let i = 1; i < reversed.length; i++) {
    num +=
      Math.pow('Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1, i) *
      (reversed.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
  }
  return num;
};

const numToLetters = num => {
  const base = 'Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
  let letters = String.fromCharCode('A'.charCodeAt(0) + (num % base));
  for (num = Math.floor(num / base); num !== 0; num = Math.floor(num / base)) {
    letters = String.fromCharCode('A'.charCodeAt(0) + (num % base) - 1) + letters;
  }
  return letters;
};

const generateCells = ref => {
  const [[startLetter, startNumber], [lastLetters, lastNumbers]] = ref
    .split(':')
    .map(s => splitAtPredicate(isDigit, s));
  const cells = [];
  for (let n = parseInt(startNumber) - 1; n < parseInt(lastNumbers); n++) {
    cells[n] = [];
    for (let ls = lettersToNum(startLetter); ls <= lettersToNum(lastLetters); ls++) {
      cells[n][ls] = numToLetters(ls) + (n + 1);
    }
  }
  return cells;
};

const mapCellsToValues = (worksheet, cells) => {
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      const cell = cells[i][j];
      const value = worksheet.Sheets[worksheet.SheetNames[0]][cell];
      cells[i][j] = value ? value.v : undefined;
    }
  }
  return cells;
};

export default function readerToAOA({ result }) {
  const worksheet = XLSX.read(new Uint8Array(result), { type: 'array' });
  const cells = generateCells(worksheet.Sheets[worksheet.SheetNames[0]]['!ref']);
  return mapCellsToValues(worksheet, cells);
}
