import { TaskStatus } from "../model/task.model.js"

export class TaskDTO {
  constructor(task) {
    this.id = task.id
    this.title = task.title
    this.description = task.description
    this.dueDate = task.dueDate
    this.status = task.status
  }

  static validateCreate(data) {
    const errors = []

    if (!data.title || data.title.trim() === "") {
      errors.push("El título es obligatorio")
    }

    if (data.status && !Object.values(TaskStatus).includes(data.status)) {
      errors.push("Estado inválido")
    }

    return errors
  }

  static validateStatus(status) {
    if (!status || !Object.values(TaskStatus).includes(status)) {
      return "Estado inválido"
    }
    return null
  }
}
