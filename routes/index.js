const router = require('express').Router();

router.use('/', require('./swagger'));

// Basic Hello World endpoint
router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send("Hello World!");
});

// Register the routes for members and coaches
router.use('/members', require('./members'));
router.use('/coaches', require('./coaches'));

// Catch-all handler for undefined routes (good practice to handle unknown routes)
router.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

module.exports = router;
