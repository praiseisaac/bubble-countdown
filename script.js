const timeouts = {};

const createCount = (stopTime, publisher, key, timers) => {
  clear(timers);
  let intervalId = set(stopTime, publisher, key, timers);
  return timeouts[intervalId];
}

const clear = ids => {
  ids.map(id => {
    clearInterval(id);
  });
}

const set = (stopTime, publisher, key, timers) => {
  var count = 0;
  if (!stopTime) return;
  let id = setInterval(async () => {
    var timeDiff = ((new Date(stopTime)) - (new Date(Date.now()))) / 1000;
    if (timeDiff <= 0) {
      clearLoc();
      publisher(key, "00:00:00");
    } else {
      publisher(key, convert(timeDiff));
    }
    count++;
  }, 1000);
  const clearLoc = () => {
    clear([id]);
  }
  return id;
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

