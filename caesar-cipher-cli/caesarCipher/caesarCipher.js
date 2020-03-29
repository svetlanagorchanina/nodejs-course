const { ENGLISH_ALPHABET } = require('./caesarCipher.constants');

function encode(str = '', shiftCount = 0, alphabet = ENGLISH_ALPHABET) {
  const strCharacters = str.split('');

  return strCharacters.reduce((resultStr, character) => {
    const encodedCharacter = getEncodedCharacter(
      character,
      shiftCount,
      alphabet
    );
    const formattedCharacter = formatCase(character, encodedCharacter);

    return `${resultStr}${formattedCharacter}`;
  }, '');
}

function decode(str = '', shiftCount = 0, alphabet = ENGLISH_ALPHABET) {
  const alphabetLength = alphabet.length;
  const updatedShift = alphabetLength - (shiftCount % alphabetLength);

  return encode(str, updatedShift, alphabet);
}

function formatCase(prevCharacter, newCharacter) {
  return prevCharacter.toUpperCase() === prevCharacter
    ? newCharacter.toUpperCase()
    : newCharacter.toLowerCase();
}

function getEncodedCharacter(character, shiftCount, alphabet) {
  const alphabetCharacters = alphabet.toLowerCase().split('');
  const alphabetSize = alphabetCharacters.length;
  const lastAlphabetIndex = alphabetSize - 1;
  const index = alphabetCharacters.indexOf(character.toLowerCase());
  const shiftedIndex = index + shiftCount;
  const newIndex =
    shiftedIndex < lastAlphabetIndex
      ? shiftedIndex % lastAlphabetIndex
      : shiftedIndex % alphabetSize;

  return index === -1 ? character.toLowerCase() : alphabetCharacters[newIndex];
}

module.exports = {
  encode,
  decode
};
