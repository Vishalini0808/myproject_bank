const roleMiddleware = (admin) => {
  return (req, res, next) => {

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

export default roleMiddleware;


export const verifyEmployeeRole = (employee) => {
  return (req,res,next) => {

    if (req.user.role !== "employee") {
      return res.status(403).json({ message : "Access Denied"})
    }

    next();
  };
};


export const verifyCustomerRole = (customer) => {
  return (req,res,next) => {

    if (req.user.role !== "customer") {
      return res.status(403).json({ message : "Access Denied"})
    }

    next();
  };
};
