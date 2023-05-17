function getMinMax(str) {
  let arr = [];

  arr = str.split(' ').filter(item => isNaN(item) == false);

  let min = arr.reduce((min, current) => Math.min(min, current));
  let max = arr.reduce((max, current) => Math.max(max, current));
  
  return result = {min: min, max: max};
}