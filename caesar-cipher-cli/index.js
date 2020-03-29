const fs = require('fs');
const cliManger = require('./cliManager');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);
const CaesarCipherStream = require('./caesarCipher/caesarCipherStream');
const { logError } = require('./utils');

process.on('exit', code => {
  return console.log(`\nExit with code ${code}`);
});

cliManger.initOptions();
const options = cliManger.getOptions();
const validateError = cliManger.validateOptions();

if (validateError) {
  logError(validateError);
  return;
}

run();

function run() {
  pipeline(
    options.input ? fs.createReadStream(options.input) : process.stdin,
    new CaesarCipherStream({ action: options.action }),
    options.output
      ? fs.createWriteStream(options.output, { flags: 'a' })
      : process.stdout
  ).catch(error => {
    logError({ message: `${error.toString()}\n`, exitCode: 9 });
  });
}
