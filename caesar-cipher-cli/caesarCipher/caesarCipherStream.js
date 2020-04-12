const stream = require('stream');
const { ACTIONS } = require('../constants');
const caesarCipher = require('./caesarCipher');
const Transform = stream.Transform;

class CaesarCipherStream extends Transform {
  constructor({ action, shift }) {
    super();
    this.action = action;
    this.shift = shift;
  }

  _transform(chunk, encoding, done) {
    const text = chunk.toString();
    const transformedText = this.transformText(text);

    this.push(transformedText);
    done();
  }

  transformText(text) {
    const actionHandlerMap = {
      [ACTIONS.ENCODE]: () => caesarCipher.encode(text, this.shift),
      [ACTIONS.DECODE]: () => caesarCipher.decode(text, this.shift)
    };

    return actionHandlerMap[this.action]();
  }
}

module.exports = CaesarCipherStream;
