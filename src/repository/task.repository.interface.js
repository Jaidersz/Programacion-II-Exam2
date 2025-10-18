export class ITaskRepository {
  save(task) {
    throw new Error("Método save() debe ser implementado")
  }

  findAll(status) {
    throw new Error("Método findAll() debe ser implementado")
  }

  findById(id) {
    throw new Error("Método findById() debe ser implementado")
  }

  delete(id) {
    throw new Error("Método delete() debe ser implementado")
  }

  findOverdue(today) {
    throw new Error("Método findOverdue() debe ser implementado")
  }
}
