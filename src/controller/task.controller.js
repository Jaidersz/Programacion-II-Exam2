import express from "express"
import { TaskService } from "../service/task.service.js"
import { TaskDTO } from "../dto/task.dto.js"

const router = express.Router()
const taskService = new TaskService()

router.post("/", (req, res) => {
  try {
    const errors = TaskDTO.validateCreate(req.body)
    if (errors.length > 0) {
      return res.status(400).json({ errors })
    }

    const { title, description, dueDate } = req.body
    const task = taskService.create(title, description, dueDate)
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/", (req, res) => {
  try {
    const { status } = req.query
    const tasks = taskService.list(status)
    res.json(tasks)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get("/overdue", (req, res) => {
  try {
    const overdueTasks = taskService.listOverdue()
    res.json(overdueTasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.patch("/:id/status", (req, res) => {
  try {
    const id = Number.parseInt(req.params.id)
    const { status } = req.body

    const error = TaskDTO.validateStatus(status)
    if (error) {
      return res.status(400).json({ error })
    }

    const updatedTask = taskService.updateStatus(id, status)
    res.json(updatedTask)
  } catch (error) {
    if (error.message === "Tarea no encontrada") {
      return res.status(404).json({ error: error.message })
    }
    res.status(500).json({ error: error.message })
  }
})

router.delete("/:id", (req, res) => {
  try {
    const id = Number.parseInt(req.params.id)
    taskService.delete(id)
    res.status(204).send()
  } catch (error) {
    if (error.message === "Tarea no encontrada") {
      return res.status(404).json({ error: error.message })
    }
    res.status(500).json({ error: error.message })
  }
})

export default router
