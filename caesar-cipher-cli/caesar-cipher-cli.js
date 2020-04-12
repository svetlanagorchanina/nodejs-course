const { buildCaesarPipeline } = require('./caesarPipeline');
const { parseOptions } = require('./cliManager');
const { EOL } = require('os');
const { handleError } = require('./utils/handleError');
const { DEFAULT_EXIT_CODE } = require('./constants');

process.on('exit', code => {
  return console.log(`\nExit with code ${code}`);
});

parseOptions()
  .then(options => buildCaesarPipeline(options))
  .catch(error =>
    handleError({
      message: error.message + EOL,
      exitCode: error.exitCode || DEFAULT_EXIT_CODE
    })
  );
