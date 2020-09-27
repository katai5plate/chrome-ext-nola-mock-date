var APP_NAME = "NOLA-MOCK-DATE";
var LOCAL_STORAGE_OFFSET_KEY = `${APP_NAME}_offset`;

var code = function ({ APP_NAME, LOCAL_STORAGE_OFFSET_KEY }) {
  console.log(`${APP_NAME}: start!`);
  const offset = Number(localStorage.getItem(LOCAL_STORAGE_OFFSET_KEY));
  if (!offset || location.hash === "#remock") {
    console.warn(
      `${APP_NAME}: Getting normal time now. Please erase the hash and reload after a while!`
    );
    console.log(`${APP_NAME}: fetching...`);
    return fetch("//worldtimeapi.org/api/ip")
      .then((x) => x.json())
      .then((x) => {
        const offset = x.unixtime * 1000 - Date.now();
        localStorage.setItem(LOCAL_STORAGE_OFFSET_KEY, offset);
        console.log(
          `${APP_NAME}: Got normal time -> ${new Date(Date.now() + offset)}`
        );
      });
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

location.href = `javascript: (${code.toString()})(${JSON.stringify({
  APP_NAME,
  LOCAL_STORAGE_OFFSET_KEY,
})})`;
