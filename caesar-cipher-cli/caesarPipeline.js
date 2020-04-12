const fs = require('fs');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);
const CaesarCipherStream = require('./caesarCipher/caesarCipherStream');

function getInputStream(input) {
  return input ? fs.createReadStream(input) : process.stdin;
}

function getOutputStream(output) {
  return output
    ? fs.createWriteStream(output, {
        flags: fs.constants.O_RDWR | fs.constants.O_APPEND
      })
    : process.stdout;
}

function buildCaesarPipeline(options) {
  return pipeline(
    getInputStream(options.input),
    new CaesarCipherStream({ action: options.action, shift: options.shift }),
    getOutputStream(options.output)
  );
}

module.exports = { buildCaesarPipeline };
