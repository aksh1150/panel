const RandomNumber = (length) => {
  let result = '';
  const numbers = '0123456789';
  const numbersLength = numbers.length;

  for (let i = 0; i < length; i += 1) {
    result += numbers.charAt(Math.floor(Math.random() * numbersLength));
  }
  return result;
};

export default RandomNumber;
