function helloWorld1() {
  return Promise.resolve('Hello World!');
}

async function helloWorld2() {
  return 'Hello World!';
}

async function logger(greeter) {
  console.log(await greeter());
}

// All four of these statements log 'Hello World!'
helloWorld1().then(console.log);
helloWorld2().then(console.log);
logger(helloWorld1);
logger(helloWorld2);

function evilHelloWorld1() {
  return Promise.reject('Hello World!');
}

async function evilHelloWorld2() {
  throw 'Hello World!';
}

async function grumpyLogger(greeter) {
  try {
    await greeter();
    console.log('Leave me alone!');
  } catch(error) {
    console.log(error);
  }
}

// Both of these statements also log 'Hello World!'
grumpyLogger(evilHelloWorld1);
grumpyLogger(evilHelloWorld2);

function timedPromise({time, result}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result), time);
  });
}

async function paraLogger(tasks) {
  const results = await Promise.all(tasks.map(timedPromise));

  console.log(results);
}

// Logs [1, 2, 3]
paraLogger([{time: 1000, result: 1}, {time: 500, result: 2}, {time: 750, result: 3}]);
