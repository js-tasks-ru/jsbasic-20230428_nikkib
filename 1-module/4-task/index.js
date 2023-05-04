function checkSpam(str) {
  let strLow = str.toLowerCase();
  return strLow.indexOf("1xbet") == -1 && strLow.indexOf("xxx") == -1 ? false : true;
}