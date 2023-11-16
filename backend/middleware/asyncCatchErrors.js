export const asyncCatchError = (passFunction) => (req, res, next) => {
  Promise.resolve(passFunction(req, res, next)).catch(next);
};
