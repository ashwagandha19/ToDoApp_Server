const TaskModel = require('../controller/Task');

const router = require("express").Router();
const taskModel = new TaskModel();

// Route to create a new task
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const task = await taskModel.createTask(name);
    res.status (201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const { completed } = req.body

    const success = await taskModel.updateTask(req.params.id, name, completed);
    if (!success) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task description updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a task by name
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const success = await taskModel.deleteTask(id);
    if (!success) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
