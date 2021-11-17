const roundTheNumber = (number, digits) => (Math.round(number*Math.pow(10, digits))/Math.pow(10, digits));

const getRandomInteger = (min, max) => {
  if (min>max) {
    const swap = min;
    min=max;
    max= swap;
  }
  const randomInteger = Math.round(Math.random() * (max - min)) + min;
  return randomInteger;
};

const getRandomFloat = (min,max,digits) => {
  if (min>max) {
    const swap = min;
    min=max;
    max= swap;
  }
  let randomFloat = Math.random() * (max - min) + min;
  randomFloat = roundTheNumber(randomFloat, digits);//Округление
  return randomFloat;
};

const implicate = (a, b) => !(a&&(!b));

export {
  getRandomFloat,
  getRandomInteger,
  roundTheNumber,
  implicate
};

