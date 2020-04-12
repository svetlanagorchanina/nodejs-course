function handleError({ message, exitCode } = {}) {
  process.stderr.write(
    `Error: ${message}`,
    () => (process.exitCode = exitCode)
  );
}

module.exports = {
  handleError
};
