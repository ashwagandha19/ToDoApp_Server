const { promisify } = require('util');
const client = require('../db');
const { CLIENT_RENEG_LIMIT } = require('tls');

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);
const delAsync = promisify(client.del).bind(client);
const keysAsync = promisify(client.keys).bind(client);

class TaskModel {

  async getAllTasks() {
    const taskKeys = await client.keys('task:*');

    const tasks = await Promise.all(taskKeys.map(async key => {
      return client.hGetAll(key)
    }));
    return tasks;
  }


  async createTask(name) {
    const taskId = Date.now().toString();
    const taskKey = `task:${taskId}`;
   
    await client.hSet(`${taskKey}`, {
      id: taskId, name: name, completed: 'false', 
    });
    return { id: taskId, name, completed };
  }

  async updateTask(id, name, completed) {
    const taskKey = `task:${id}`;

    await client.hSet(`${taskKey}`, {
      id: id, name, completed
    });

    return true;
  }

  async deleteTask(id) {
    const taskKey = `task:${id}`;
    console.log("TK", taskKey)
    await client.del(`${taskKey}`);
    console.log("PASSED")
    return true;
  }
}

module.exports = TaskModel;
