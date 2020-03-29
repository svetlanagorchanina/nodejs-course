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

function getOptions() {
  return program.opts();
}

function validateOptions() {
  const options = getOptions();

  if (![ACTIONS.DECODE, ACTIONS.ENCODE].includes(options.action)) {
    return {
      message: 'Error: Action can be only "encode" or "decode"',
      exitCode: 9
    };
  }

  if (!Number.isInteger(options.shift)) {
    return {
      message: 'Error: Shift parameter should be integer',
      exitCode: 9
    };
  }
}

module.exports = {
  initOptions,
  validateOptions,
  getOptions
};
