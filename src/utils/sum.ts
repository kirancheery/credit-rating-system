let sum = (...args) => {
  var len = args.length;
  var s = 0;
  for (var i = 0; i < len; i++) {
    if (!isNaN(args[i])) {
      s += Number(args[i]);
    }
  }
  return s;
};
export default sum;
