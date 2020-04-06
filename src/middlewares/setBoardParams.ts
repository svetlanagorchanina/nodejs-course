export function setBoardParams(req, res, next) {
  req.boardParams = {
    id: req.params.id,
  };

  next();
}
