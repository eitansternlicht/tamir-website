import _ from 'mori';

const isDigit = c => c >= '0' && c <= '9';

const identity = x => x;

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

const aoaMap = (f, aoa) => _.map(row => _.map(f, row), aoa);

const range = ({ start, end, toNum = _.identity, fromNum = _.identity }) =>
  _.map(fromNum, _.range(toNum(start), toNum(end) + 1));

const createMatrix = (xs, ys, valueFunc = (a, b) => a + b) =>
  _.map(y => _.map(x => valueFunc(x, y), xs), ys);


const concatAll = aoaoa => {
  const aoas = [];
  aoaoa.forEach(subArray => {
    subArray.forEach(subArrayValue => {
      aoas.push(subArrayValue);
    });
  });
  return aoas;
};

export { concatAll, createMatrix, range, isDigit, reverseString, splitAtPredicate, aoaMap };

