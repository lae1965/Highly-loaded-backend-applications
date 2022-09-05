const arr = [];
const set = new Set();
const elementNumber = 23481;

const getTimeOfOperation = (cb) => {
  const begTime = performance.now();
  cb();
  return performance.now() - begTime;
}

const compareTimeOfOperations = (str1, str2, cbArr, cbSet, numIteration) => {
  const arrTime = getTimeOfOperation(cbArr);
  const setTime = getTimeOfOperation(cbSet);

  console.log(`Время ${str1} элемента в Array - ${arrTime / numIteration}мс, в Set - ${setTime / numIteration}мс.`);
  console.log(`Array по сравнению с Set при ${str2} элемента работает ${arrTime > setTime ? 'медленнее в ' + arrTime / setTime : 'быстрее в ' + setTime / arrTime} раз.\n`);
};

compareTimeOfOperations(
  'добавления',
  'добавлении',
  () => {for (let i = 0; i < 1000000; i++) arr.push(i)},
  () => {for (let i = 0; i < 1000000; i++) set.add(i)},
  1000000
);

compareTimeOfOperations(
  'поиска',
  'поиске',
  () => {for (let i = 0; i < 1000; i++) arr.indexOf(elementNumber + i)},
  () => {for (let i = 0; i < 1000; i++) set.has(elementNumber + i)},
  1000
);

compareTimeOfOperations(
  'удаления',
  'удалении',
  () => {for (let i = 0; i < 1000; i++) arr.splice(arr.indexOf(elementNumber + i), 1)},
  () => {for (let i = 0; i < 1000; i++) set.delete(elementNumber + i)},
  1000
);
