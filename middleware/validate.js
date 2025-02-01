const validator = require('../helpers/validate');

// Member validation
const validateMember = (req, res, next) => {
  const validationRule = {
    name: 'required|string',                // 'name' for members
    age: 'required|numeric',                // 'age' for members
    membershipType: 'required|string',      // 'membershipType' for members
    joinDate: 'required|date',              // 'joinDate' for members
    contactNumber: 'required|string',       // 'contactNumber' for members
    coachId: 'required|string'              // 'coachId' for members (foreign key to coaches)
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
    name: 'required|string',                // 'name' for coaches
    specialty: 'required|string',           // 'specialty' for coaches
    experienceYears: 'required|numeric',    // 'experienceYears' for coaches
    contactNumber: 'required|string'        // 'contactNumber' for coaches
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
