import { Task, TaskStatus } from "../model/task.model.js"
import { TaskDTO } from "../dto/task.dto.js"
import { InMemoryTaskRepository } from "../repository/in-memory-task.repository.js"

export class TaskService {
  constructor() {
    this.taskRepository = new InMemoryTaskRepository()
  }

  create(title, description, dueDate) {
    const task = new Task(null, title, description, dueDate, TaskStatus.PENDING)
    const savedTask = this.taskRepository.save(task)
    return new TaskDTO(savedTask)
  }

  list(status) {
    if (status && !Object.values(TaskStatus).includes(status)) {
      throw new Error("Estado inválido")
    }
    const tasks = this.taskRepository.findAll(status)
    return tasks.map((task) => new TaskDTO(task))
  }

  updateStatus(id, newStatus) {
    const task = this.taskRepository.findById(id)
    if (!task) {
      throw new Error("Tarea no encontrada")
    }
    if (!Object.values(TaskStatus).includes(newStatus)) {
      throw new Error("Estado inválido")
    }
    task.status = newStatus
    return new TaskDTO(task)
  }

  delete(id) {
    const task = this.taskRepository.findById(id)
    if (!task) {
      throw new Error("Tarea no encontrada")
    }
    this.taskRepository.delete(id)
  }

  listOverdue() {
    const today = new Date()
    const overdueTasks = this.taskRepository.findOverdue(today)
    return overdueTasks.map((task) => new TaskDTO(task))
  }
}
