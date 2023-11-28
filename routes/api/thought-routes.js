const router = require('express').Router();
const {
  createThought,
  getAllThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/')
  .post(createThought)
  .get(getAllThoughts);

// /api/thoughts/:id
router.route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:id/reactions
router.route('/:id/reactions')
  .post(createReaction);

// /api/thoughts/:id/reactions/:reactionId
router.route('/:id/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;
