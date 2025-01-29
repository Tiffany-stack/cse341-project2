const express = require('express');
const router = express.Router();
const { validateCoach } = require('../middleware/validate'); // Validation middleware
const coachesController = require('../controllers/coaches'); // Controller for coach actions

// Get all coaches
router.get('/', coachesController.getAll);

// Get a single coach by ID
router.get('/:id', coachesController.getSingle);

// Create a new coach
router.post('/', validateCoach, coachesController.createCoach); // Validate coach before creating

// Update a coach by ID
router.put('/:id', validateCoach, coachesController.updateCoach); // Validate coach before updating

// Delete a coach by ID
router.delete('/:id', coachesController.deleteCoach);

module.exports = router;
