const validator = require('../helpers/validate');

// Member validation
const validateMember = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    phone: 'required|string',
    membershipStartDate: 'required|date',
    membershipType: 'required|string',
    coachId: 'required|string' // Assuming members are assigned a coach
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Member validation failed',
        data: err
      });
    }
    next();
  });
};

// Coach validation
const validateCoach = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    specialty: 'required|string',
    email: 'required|email',
    phone: 'required|string',
    hireDate: 'required|date'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Coach validation failed',
        data: err
      });
    }
    next();
  });
};

module.exports = {
  validateMember,
  validateCoach
};
