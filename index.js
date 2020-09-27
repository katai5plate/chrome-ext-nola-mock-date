var code = function () {
  const MINUTES = 1000 * 60;
  const DATE_OFFSET = -15 * MINUTES;

  console.log("mocking...");

  const _date = Date;
  window.Date = function (...args) {
    console.log(args);
    if (args.length) {
      return new _date(...args);
    }
    return new _date(Date.now() + DATE_OFFSET);
  };
  for (const i of Object.getOwnPropertyNames(_date)) {
    window.Date[i] = _date[i];
  }

  console.log("done!");
};
location.href = `javascript: (${code.toString()})()`;
