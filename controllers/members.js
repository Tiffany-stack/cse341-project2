// members.js
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Members']
  try {
    const result = await mongodb.getDatabase().db().collection('members').aggregate([
      {
        $lookup: {
          from: 'coaches',
          localField: 'coachId',
          foreignField: '_id',
          as: 'coachDetails'
        }
      }
    ]).toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve members', error: error.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Members']
  try {
    const memberId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('members').aggregate([
      { $match: { _id: memberId } },
      {
        $lookup: {
          from: 'coaches',
          localField: 'coachId',
          foreignField: '_id',
          as: 'coachDetails'
        }
      }
    ]).toArray();

    if (result.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: 'Member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve member', error: error.message });
  }
};

const createMember = async (req, res) => {
  //#swagger.tags = ['Members']
  try {
    const { name, age, membershipType, joinDate, contactNumber, coachId } = req.body;

    if (!name || !age || !membershipType || !joinDate || !contactNumber) {
      return res.status(400).json({ message: 'Missing required fields for creating a member.' });
    }

    const member = {
      name,
      age,
      membershipType,
      joinDate,
      contactNumber,
      coachId: coachId ? new ObjectId(coachId) : null
    };

    const response = await mongodb.getDatabase().db().collection('members').insertOne(member);

    if (response.acknowledged) {
      res.status(201).json({ message: 'Member created successfully', memberId: response.insertedId });
    } else {
      res.status(500).json({ message: 'Some error occurred while inserting the member' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to create member', error: error.message });
  }
};

const updateMember = async (req, res) => {
  //#swagger.tags = ['Members']
  try {
    const memberId = new ObjectId(req.params.id);
    const { name, age, membershipType, joinDate, contactNumber, coachId } = req.body;

    if (!name || !age || !membershipType || !joinDate || !contactNumber) {
      return res.status(400).json({ message: 'Missing required fields for updating a member.' });
    }

    const member = {
      name,
      age,
      membershipType,
      joinDate,
      contactNumber,
      coachId: coachId ? new ObjectId(coachId) : null
    };

    const response = await mongodb.getDatabase().db().collection('members').replaceOne({ _id: memberId }, member);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Member not found or no changes were made' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update member', error: error.message });
  }
};

const deleteMember = async (req, res) => {
  //#swagger.tags = ['Members']
  try {
    const memberId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('members').deleteOne({ _id: memberId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete member', error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMember,
  updateMember,
  deleteMember
};