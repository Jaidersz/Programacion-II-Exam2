import { ITaskRepository } from "./task.repository.interface.js"
import { TaskStatus } from "../model/task.model.js"

export class InMemoryTaskRepository extends ITaskRepository {
  constructor() {
    super()
    this.store = []
    this.currentId = 1
  }

  save(task) {
    task.id = this.currentId
    this.currentId = this.currentId + 1
    this.store.push(task)
    return task
  }

  findAll(status) {
    if (status) {
      return this.store.filter((task) => task.status === status)
    }
    return this.store
  }

  findById(id) {
    const task = this.store.find((task) => task.id === id)
    return task || null
  }

  delete(id) {
    const index = this.store.findIndex((task) => task.id === id)
    if (index !== -1) {
      this.store.splice(index, 1)
    }
  }

  findOverdue(today) {
    return this.store.filter((task) => {
      if (!task.dueDate || task.status === TaskStatus.DONE) {
        return false
      }
      const dueDate = new Date(task.dueDate)
      return dueDate < today
    })
  }
}
