# Task Management API

Clean Architecture implementation of a Task Management REST API using Node.js and Express.

## Architecture

This project follows a layered architecture with clear separation of concerns:

- **Controller Layer**: HTTP request/response handling, input validation
- **Service Layer**: Business logic and orchestration
- **Repository Layer**: Data persistence abstraction
- **Model Layer**: Domain entities (Task, TaskStatus)
- **DTO Layer**: Data transfer objects for input/output

## Project Structure

\`\`\`
src/
├── controller/          # HTTP controllers (no business logic)
│   └── task.controller.js
├── service/            # Business logic layer
│   └── task.service.js
├── repository/         # Data persistence layer
│   ├── task.repository.interface.js
│   └── in-memory-task.repository.js
├── model/              # Domain entities
│   └── task.model.js
├── dto/                # Data transfer objects
│   └── task.dto.js
└── index.js            # Application entry point
\`\`\`

## API Endpoints

### Create Task
\`\`\`bash
POST /tasks
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task management API",
  "dueDate": "2025-10-20"
}
\`\`\`

### List Tasks (with optional filter)
\`\`\`bash
GET /tasks
GET /tasks?status=PENDING
GET /tasks?status=IN_PROGRESS
GET /tasks?status=DONE
\`\`\`

### Update Task Status
\`\`\`bash
PATCH /tasks/:id/status
Content-Type: application/json

{
  "status": "IN_PROGRESS"
}
\`\`\`

### Delete Task
\`\`\`bash
DELETE /tasks/:id
\`\`\`

### List Overdue Tasks
\`\`\`bash
GET /tasks/overdue
\`\`\`

## Task Status

- `PENDING` - Task is pending
- `IN_PROGRESS` - Task is in progress
- `DONE` - Task is completed

## Installation

\`\`\`bash
npm install
\`\`\`

## Running the API

\`\`\`bash
# Production mode
npm start

# Development mode (with auto-reload)
npm run dev
\`\`\`

The API will be available at `http://localhost:3000`

## Testing with cURL

\`\`\`bash
# Create a task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","dueDate":"2025-10-15"}'

# List all tasks
curl http://localhost:3000/tasks

# List pending tasks
curl http://localhost:3000/tasks?status=PENDING

# Update task status
curl -X PATCH http://localhost:3000/tasks/1/status \
  -H "Content-Type: application/json" \
  -d '{"status":"IN_PROGRESS"}'

# List overdue tasks
curl http://localhost:3000/tasks/overdue

# Delete a task
curl -X DELETE http://localhost:3000/tasks/1
\`\`\`

## Design Principles

✅ **Clean Architecture**: Clear separation between layers
✅ **No business logic in controllers**: Controllers only handle HTTP concerns
✅ **Repository pattern**: Data access abstraction through interfaces
✅ **DTO pattern**: Input/output validation and transformation
✅ **Dependency injection**: Services receive repository instances
✅ **Single Responsibility**: Each class has one clear purpose
