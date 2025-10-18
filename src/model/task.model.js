export const TaskStatus = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
}

export class Task {
  constructor(id, title, description, dueDate, status) {
    this.id = id
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.status = status || TaskStatus.PENDING
  }
}
