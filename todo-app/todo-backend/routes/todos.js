const express = require('express');
const { Todo } = require('../mongo')
// redis
const redis = require("../redis")
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  // count added todos
  const added_todo = parseInt(await redis.getAsync("added_todo") ?? 0)
  console.log(added_todo)
  redis.setAsync("added_todo", added_todo+1)

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const ret = await req.todo
  res.send(ret)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  if (!req.body.text || !req.body.done) {
    res.sendStatus(400)
  }
  const newTodo = req.body
  await req.todo.updateOne({
    ...newTodo,
  })
  res.send(newTodo) 
});

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;
