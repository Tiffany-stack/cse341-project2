const express = require('express');
const router = express.Router();
const { validateMember } = require('../middleware/validate'); // Validation middleware
const membersController = require('../controllers/members'); // Controller for member actions

// Get all members
router.get('/', membersController.getAll);

// Get a single member by ID
router.get('/:id', membersController.getSingle);

// Create a new member
router.post('/', validateMember, membersController.createMember); // Validate member before creating

// Update a member by ID
router.put('/:id', validateMember, membersController.updateMember); // Validate member before updating

// Delete a member by ID
router.delete('/:id', membersController.deleteMember);

module.exports = router;
