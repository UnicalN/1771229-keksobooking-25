function GetRandomInteger(min, max)
{
  if (min>max)
  {
    return -1;
  }
  const randomInteger = Math.round(Math.random() * (max - min)) + min;
  return randomInteger;
}

function GetRandomFloat(min,max)
{
  if (min>max)
  {
    return -1;
  }
  const randomFloat = Math.random() * (max - min) + min;
  return randomFloat;
}

GetRandomInteger(100,110);
GetRandomFloat(1.2, 1.3);
