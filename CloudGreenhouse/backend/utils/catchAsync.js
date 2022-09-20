module.exports = (a_fn) => {
  return (req, res, next) => {
    a_fn(req, res, next).catch((err) => next(err));
  };
};
