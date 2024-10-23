// Middleware to check if the owner is logged in
const checkOwnerAuth = (req, res, next) => {
  if (req.session && req.session.ownerId) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = { checkOwnerAuth };
