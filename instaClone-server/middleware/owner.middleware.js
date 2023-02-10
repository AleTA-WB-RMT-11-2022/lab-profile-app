module.exports = (req, res, next) => {
    // checks if the current user is also the owner of the profile he/she wants to visit
    if (req.payload._id) {
      return ;
    }
    
    next();
  };