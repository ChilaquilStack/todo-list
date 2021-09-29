const { Router } = require('express');
const TodoController = require('../controllers/Todos');

const router = Router();

router.route('/')
        .get(TodoController.index)
        .post(TodoController.create)

router.route('/:id')
        .put(TodoController.update)
        .delete(TodoController.destroy);

module.exports = router;