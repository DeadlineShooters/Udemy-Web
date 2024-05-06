export default func => {
  return (req, res, next) => {
      func(req, res, next).catch(next); // short hand for .catch(e => next(e))
  }
}