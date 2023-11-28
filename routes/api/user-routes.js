const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  getSingleUser,
  deleteUser,
  editUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// /api/users
router.route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router.route('/:id')
  .get(getSingleUser)
  .put(editUser)
  .delete(deleteUser);

// /api/users/:id/friends
router.route('/:id/friends')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
