var timeoutId = undefined;
var count = 0;
const createCount = (stopTime) => {
  clear();
  set(stopTime);
}

const clear = () => {
  clearInterval(timeoutId)
}

const set = (stopTime) => {
  if (!stopTime) return;
  timeoutId = setInterval(() => {
    if ((new Date(Date.now())) > new Date(stopTime)) {
      clear();
    }
    console.log((new Date(Date.now())).toLocaleTimeString());
    count++;
  }, 1000);
}

const reset = () => {
  clear();
  set();
}

