// ==========================================
// ROLE-BASED AUTHORIZATION MIDDLEWARE
// ==========================================
// Use AFTER the `protect` middleware (needs req.user to be set).
// Usage: router.post("/mark", protect, authorize("faculty", "admin"), markAttendance);

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Not authorized. Insufficient role permissions.",
      });
    }
    next();
  };
};

module.exports = authorize;
