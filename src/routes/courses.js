const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id/destroy', courseController.destroy);
router.delete('/:id', courseController.delete);
router.get('/:slug', courseController.show);
router.get('/', courseController.default);

module.exports = router;