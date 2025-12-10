const chars = [
  [..."abcdefghijklmnopqrstuvwxyz"],
  [..."0123456789"],
  [..."#$*-"],
];

export const generateRandomString = (length: number) => {
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomCategoryIndex = Math.round(Math.random() * 2);
    const randomCharIndex = Math.round(
      Math.random() * (chars[randomCategoryIndex].length - 1)
    );
    const randomUpperOrLower = Math.round(Math.random() * 1);

    let randomChar = chars[randomCategoryIndex][randomCharIndex];

    if (randomUpperOrLower === 0) randomChar = randomChar.toUpperCase();
    randomString += randomChar;
  }
  return randomString;
};
