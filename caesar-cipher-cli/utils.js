function logError({ message, exitCode } = {}) {
  process.stderr.write(message, () => (process.exitCode = exitCode));
}

module.exports = {
  logError
};
