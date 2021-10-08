function getRandomInteger(min, max)
{
  if (min>max)
  {
    return -1;
  }
  const randomInteger = Math.round(Math.random() * (max - min)) + min;
  return randomInteger;
}

function getRandomFloat(min,max)
{
  if (min>max)
  {
    return -1;
  }
  const randomFloat = Math.random() * (max - min) + min;
  return randomFloat;
}

getRandomInteger(100,110);
getRandomFloat(1.2, 1.3);
