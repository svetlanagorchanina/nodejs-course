const stream = require('stream');
const { ACTIONS } = require('../constants');
const caesarCipher = require('./caesarCipher');
const { getOptions } = require('../cliManager');
const Transform = stream.Transform;

class CaesarCipherStream extends Transform {
  constructor({ action }) {
    super();
    this.action = action;
  }

  _transform(chunk, encoding, done) {
    const text = chunk.toString();
    const transformedText = this.transformText(text);

    this.push(transformedText);
    done();
  }

  transformText(text) {
    const options = getOptions();

    const actionHandlerMap = {
      [ACTIONS.ENCODE]: () => caesarCipher.encode(text, options.shift),
      [ACTIONS.DECODE]: () => caesarCipher.decode(text, options.shift)
    };

    return actionHandlerMap[this.action]();
  }
}

module.exports = CaesarCipherStream;
