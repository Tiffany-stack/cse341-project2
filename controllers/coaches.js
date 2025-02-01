// coaches.js
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Coaches']
  try {
    const result = await mongodb.getDatabase().collection('coaches').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve coaches', error: error.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Coaches']
  try {
    const coachId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('coaches').find({ _id: coachId }).toArray();

    if (result.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: 'Coach not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve coach', error: error.message });
  }
};

const createCoach = async (req, res) => {
  //#swagger.tags = ['Coaches']
  try {
    const { name, specialty, experienceYears, contactNumber } = req.body;

    if (!name || !specialty || !experienceYears || !contactNumber) {
      return res.status(400).json({ message: 'Missing required fields for creating a coach.' });
    }

    const coach = { name, specialty, experienceYears, contactNumber };
    const response = await mongodb.getDatabase().collection('coaches').insertOne(coach);

    if (response.acknowledged) {
      res.status(201).json({ message: 'Coach created successfully', coachId: response.insertedId });
    } else {
      res.status(500).json({ message: 'Some error occurred while inserting the coach' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to create coach', error: error.message });
  }
};

const updateCoach = async (req, res) => {
  //#swagger.tags = ['Coaches']
  try {
    const coachId = new ObjectId(req.params.id);
    const { name, specialty, experienceYears, contactNumber } = req.body;

    if (!name || !specialty || !experienceYears || !contactNumber) {
      return res.status(400).json({ message: 'Missing required fields for updating a coach.' });
    }

    const coach = { name, specialty, experienceYears, contactNumber };
    const response = await mongodb.getDatabase().collection('coaches').replaceOne({ _id: coachId }, coach);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Coach not found or no changes were made' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update coach', error: error.message });
  }
};

const deleteCoach = async (req, res) => {
  //#swagger.tags = ['Coaches']
  try {
    const coachId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('coaches').deleteOne({ _id: coachId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Coach not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete coach', error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCoach,
  updateCoach,
  deleteCoach
};