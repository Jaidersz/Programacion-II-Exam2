import express from "express"
import taskRouter from "./controller/task.controller.js"

const app = express()
const PORT = 3000

app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    message: "Task Management API",
    endpoints: {
      "POST /tasks": "Crear tarea",
      "GET /tasks": "Listar tareas",
      "GET /tasks?status=PENDING": "Filtrar por estado",
      "PATCH /tasks/:id/status": "Actualizar estado",
      "DELETE /tasks/:id": "Eliminar tarea",
      "GET /tasks/overdue": "Tareas vencidas",
    },
  })
})

app.use("/tasks", taskRouter)

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
