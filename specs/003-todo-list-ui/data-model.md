# Data Model: Static Todo List UI

## Key Entities

- **Task**: Represents a single todo item with detailed information.
    *   Attributes:
        *   `id`: Unique identifier.
        *   `title`: The main description of the task.
        *   `completed`: Boolean indicating if the task is done.
        *   `assignees`: Array of `UserProfile` (or simplified `Avatar` data).
        *   `dueDate`: Date string.
        *   `subtasksProgress`: String (e.g., "3/5").
        *   `status`: String (e.g., "Pending", "In Progress", "Completed").
        *   `priority`: String (e.g., "Low", "Medium", "High").
- **UserProfile (simplified for assignees)**:
    *   Attributes:
        *   `avatarUrl`: URL to the user's avatar image.
        *   `name`: The user's display name.