const { performance } = require('perf_hooks');

const arr = [];
const set = new Set();
const elementNumber = 23481;

for (let i = 0; i < 100000; i++) { 
  arr.push(i);
  set.add(i);
}

const getTimeOfOperation = (cb) => {
  const begTime = performance.now();
  cb();
  return performance.now() - begTime;
}

const compareTimeOfOperations = (str1, str2, cbArr, cbSet) => {
  const arrTime = getTimeOfOperation(cbArr);
  const setTime = getTimeOfOperation(cbSet);

  console.log(`Время ${str1} элемента в Array - ${arrTime}мс, в Set - ${setTime}мс.`);
  console.log(`Array по сравнению с Set при ${str2} элемента работает ${arrTime > setTime ? 'медленнее в ' + arrTime / setTime : 'быстрее в ' + setTime / arrTime} раз.\n`);
};

compareTimeOfOperations(
  'добавления',
  'добавлении',
  () => {arr.push(100001)},
  () => {set.add(100001)}
);

compareTimeOfOperations(
  'удаления',
  'удалении',
  () => {arr.splice(arr.indexOf(elementNumber), 1)},
  () => {set.delete(elementNumber)}
);

compareTimeOfOperations(
  'поиска',
  'поиске',
  () => {arr.indexOf(elementNumber)},
  () => {set.has(elementNumber)}
);
