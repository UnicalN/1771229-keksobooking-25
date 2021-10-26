function getRandomInteger(min, max)
{
  if (min>max)
  {
    const swap = min;
    min=max;
    max= swap;
  }
  const randomInteger = Math.round(Math.random() * (max - min)) + min;
  return randomInteger;
}

function getRandomFloat(min,max,digits)
{
  if (min>max)
  {
    const swap = min;
    min=max;
    max= swap;
  }
  let randomFloat = Math.random() * (max - min) + min;
  randomFloat = Math.round(randomFloat*Math.pow(10, digits))/Math.pow(10, digits);//Округление
  return randomFloat;
}
export {getRandomFloat, getRandomInteger};
