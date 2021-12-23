var timeoutId = undefined;
var count = 0;
const createCount = (stopTime, publisher, key) => {
  clear();
  console.log(stopTime);
  set(stopTime, publisher, key);
}

const clear = () => {
  clearInterval(timeoutId)
}

const set = (stopTime, publisher, key) => {
  console.log(stopTime);
  if (!stopTime) return;
  timeoutId = setInterval(() => {
    var timeDiff = ((new Date(stopTime)) - (new Date(Date.now()))) / 1000;
    if (timeDiff <= 0) {
      clear();
    }
    console.log(timeDiff);
    publisher(key, convert(timeDiff));
    count++;
  }, 1000);
}

const reset = () => {
  clear();
  set();
}

var convert = (seconds) => {
  var secs = parseInt(seconds, 10);
  var h = Math.floor(secs / 3600);
  var m = Math.floor(secs / 60) % 60;
  var s = secs % 60

  return [h, m, s]
    .map(val => val < 10 ? "0" + val : val)
    .filter((val, ix) => val !== "00" || ix > 0)
    .join(":");
}

