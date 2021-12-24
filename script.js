const timeouts = {};

const createCount = (stopTime, publisher, key, id) => {
  timeouts[id] = set(stopTime, publisher, key, id);
}

const clear = id => {
  if (!timeouts[id]) return;
  clearInterval(timeouts[id]);
}

const set = (stopTime, publisher, key, id) => {
  var count = 0;
  if (!stopTime) return;
  return setInterval(async () => {
    var timeDiff = ((new Date(stopTime)) - (new Date(Date.now()))) / 1000;
    if (timeDiff <= 0) {
      clear(id);
      publisher(key, "00:00:00");
    }
    publisher(key, convert(timeDiff));
    count++;
  }, 1000);
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

