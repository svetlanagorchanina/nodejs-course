const { program } = require('commander');
const { ACTIONS } = require('./constants');

function initOptions() {
  program
    .storeOptionsAsProperties(false)
    .requiredOption('-s, --shift <number>', 'Shift count', Number)
    .requiredOption('-a,--action <action>', 'Action encode or decode')
    .option('-i, --input <path>', 'Path to input file')
    .option('-o, --output <path>', 'Path to output file');

  program.parse(process.argv);
}

function getValidationError(options) {
  if (![ACTIONS.DECODE, ACTIONS.ENCODE].includes(options.action)) {
    return { message: 'Action can be only "encode" or "decode"' };
  }

  if (!Number.isInteger(options.shift) || options.shift < 0) {
    return { message: 'Shift parameter should be positive integer' };
  }
}

function parseOptions() {
  return new Promise((resolve, reject) => {
    initOptions();

    const options = program.opts();
    const error = getValidationError(options);

    error ? reject(error) : resolve(options);
  });
}

module.exports = { parseOptions };
