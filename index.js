var APP_NAME = "NOLA-MOCK-DATE";
var LOCAL_STORAGE_OFFSET_KEY = `${APP_NAME}_offset`;

var code = function (APP_NAME, offset) {
  console.log(`${APP_NAME}: start!`);
  if (!offset) {
    return console.warn(
      `${APP_NAME}: Getting normal time now. Please reload after a while!`
    );
  }
  console.log(`${APP_NAME}: offset -> ${offset}`);
  const _date = Date;
  window.Date = function (...args) {
    if (args.length) {
      return new _date(...args);
    }
    return new _date(Date.now() + offset);
  };
  for (const i of Object.getOwnPropertyNames(_date)) {
    window.Date[i] = _date[i];
  }
  console.log(`${APP_NAME}: done!`);
};

fetch("//worldtimeapi.org/api/ip")
  .then((x) => x.json())
  .then((x) => {
    const offset = x.unixtime * 1000 - Date.now();
    localStorage.setItem(LOCAL_STORAGE_OFFSET_KEY, offset);
    console.log(
      `${APP_NAME}: Got normal time -> ${new Date(Date.now() + offset)}`
    );
  });

location.href = `javascript: (${code.toString()})("${APP_NAME}",${localStorage.getItem(
  LOCAL_STORAGE_OFFSET_KEY
)})`;
