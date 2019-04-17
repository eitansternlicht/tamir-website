import XLSX from 'xlsx';
import _ from 'mori';
import {
  isDigit,
  reverseString,
  splitAtPredicate,
  aoaMap,
  range,
  createMatrix,
  concatAll
} from './general-utils';

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
  const [[startLetter, startNumber], [endLetters, endNumbers]] = ref
    .split(':')
    .map(s => splitAtPredicate(isDigit, s))
    .map(([s, n]) => [s, parseInt(n)]);
  const numbers = range({ start: startNumber, end: endNumbers });
  const letters = range({
    start: startLetter,
    end: endLetters,
    toNum: lettersToNum,
    fromNum: numToLetters
  });
  return createMatrix(letters, numbers);
};

const mapCellsToValues = (worksheet, cells) =>
  aoaMap(cell => {
    console.log(`cell: ${cell}`);
    const value = worksheet.Sheets[worksheet.SheetNames[0]][cell];
    return value ? value.v : undefined;
  });

const openFile = inputFile => {
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      resolve();
    };
    fileReader.onload = () => {
      resolve({ fileName: inputFile.name, result: fileReader.result });
    };
    fileReader.readAsArrayBuffer(inputFile);
  });
};

const fileToAOA = ({ fileName, result }) => {
  const res = [];
  if (typeof result !== 'string') {
    const worksheet = XLSX.read(new Uint8Array(result), { type: 'array' });
    worksheet.SheetNames.forEach(function(sheetName) {
      const roa = XLSX.utils.sheet_to_json(worksheet.Sheets[sheetName], { header: 1 });
      if (roa.length) {
        res.push({ fileName, sheetName, aoa: roa });
      }
    });
  }
  return res;
};

const filesToAOAs = files => {
  const openPromises = files.map(openFile);

  return new Promise((resolve, reject) => {
    Promise.all(openPromises).then(openedFiles => {
      // console.log(`openedFiles: ${openedFiles}`);
      // debugger;
      // const aoas = openedFiles
      // .filter(x => x !== undefined)
      // .map(fileToAOA);
      // .filter(aoa => aoa.length !== 0);
      // console.log(`aoas: ${aoas}`);

      resolve(
        concatAll(
          openedFiles
            .filter(x => x !== undefined)
            .map(fileToAOA)
            .filter(aoa => aoa.length !== 0)
        )
      );
    });
  });
};

// const filesToAOAs = files =>
//   new Promise((resolve, reject) =>
//     Promise.all(_.map(readUploadedFileAsArrayBuffer, files)).then(fileReaders =>
//       resolve(
//         _.fileReaders
//           .filter(x => x !== undefined)
//           .map(fileReader => readerToAOA(fileReader))
//           .filter(aoa => aoa.length !== 0)
//       )
//     )
//   );

export { filesToAOAs };
