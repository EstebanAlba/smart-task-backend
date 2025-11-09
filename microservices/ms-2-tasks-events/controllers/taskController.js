// controllers/taskController.js
const Task = require('../models/Task');

// Crear tarea
exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la tarea', error: err.message });
  }
};

// Obtener todas las tareas
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener tareas', error: err.message });
  }
};

// Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener la tarea', error: err.message });
  }
};

// Actualizar tarea
exports.updateTask = async (req, res) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) return res.status(404).json({ message: 'Tarea no encontrada' });
    const updatedTask = await Task.findByPk(req.params.id);
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la tarea', error: err.message });
  }
};

// Eliminar tarea
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error: err.message });
  }
};

