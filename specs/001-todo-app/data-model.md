# Data Model: Todo App

**Feature Branch**: `001-todo-app`  
**Created**: October 28, 2025  
**Status**: Draft  
**Feature Spec**: /Users/toannh/projects/lap-trinh-voi-ai/homework03/specs/001-todo-app/spec.md

## Entities

### Todo Item

Represents a single task that the user wants to manage.

**Attributes**:

- `id`: (String) A unique identifier for the todo item. This will be generated upon creation (e.g., using `uuid` or a simple timestamp-based ID).
- `text`: (String) The descriptive text of the todo item (e.g., "Buy groceries").
- `completed`: (Boolean) Indicates the completion status of the todo item. `true` if completed, `false` if incomplete. Defaults to `false` upon creation.

**Relationships**:

- None. Todo items are independent entities within the application.

**Validation Rules**:

- `text` attribute MUST NOT be empty or contain only whitespace.

**State Transitions**:

- A `Todo Item` can transition between `completed: false` (incomplete) and `completed: true` (complete) based on user interaction.
