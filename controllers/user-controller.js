const UserModel = require('../models/User');
const ThoughtModel = require('../models/Thought');

const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.find().populate('thoughts');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await UserModel.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await UserModel.findOne({ _id: req.params.id })
        .select('-__v')
        .populate('friends')
        .populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await UserModel.findOneAndRemove({ _id: req.params.id });
      
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      
      const thoughts = await ThoughtModel.deleteMany({ username: user.username });
      res.json(thoughts);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async editUser(req, res) {
    try {
      const user = await UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
      
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const user = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.body.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const user = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = UserController;
