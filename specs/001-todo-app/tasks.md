# Tasks: Todo App

**Feature Branch**: `001-todo-app`  
**Created**: October 28, 2025  
**Status**: To Do  
**Feature Spec**: /Users/toannh/projects/lap-trinh-voi-ai/homework03/specs/001-todo-app/spec.md

## Implementation Strategy

This feature will be implemented using an MVP-first approach, focusing on delivering core user value incrementally. The tasks are organized by user story to enable independent development and testing. The primary goal is to get a functional Todo App with persistence as quickly as possible.

## Phase 1: Setup

- [x] T001 Execute shell command: `npx shadcn@latest add card`
- [x] T002 Execute shell command: `npx shadcn@latest add input`
- [x] T003 Execute shell command: `npx shadcn@latest add checkbox`
- [x] T004 Execute shell command: `pnpm add lucide-react`

## Phase 2: Foundational

- [x] T005 Create new directory: `src/components/app`
- [x] T006 Create new file: `src/components/app/TodoApp.tsx`

## Phase 3: User Story 1 - Manage Todos & Persistent Todo List (P1)

**Story Goal**: As a user, I want to be able to add new todo items, view my existing todo list, mark items as complete or incomplete, and remove items I no longer need, and I want my todo list to be saved automatically and loaded when I reopen the application, so I can effectively manage my tasks and not lose them.

**Independent Test**: Interact with the application's UI to add, view, complete/uncomplete, and delete todo items. Close and reopen the application to verify that the list state is preserved.

- [x] T007 [US1] Overwrite file `src/components/app/TodoApp.tsx` with the complete component code including `Todo` interface, `useState` for todos and input, `useEffect` for `localStorage` load/save, and `handleAddTodo`, `handleToggleComplete`, `handleDeleteTodo` functions.
- [x] T008 [US1] Overwrite file `src/App.tsx` to import and render the `TodoApp` component, adding a minimal styling wrapper.

## Final Phase: Polish & Cross-Cutting Concerns

- [x] T009 Display completion message to the user: "Hoàn tất! Ứng dụng Todo App đã sẵn sàng. Chạy 'pnpm dev' để bắt đầu."

## Dependencies

- Phase 1 must be completed before Phase 2.
- Phase 2 must be completed before Phase 3.

## Parallel Execution Examples

- Tasks within Phase 1 (T001, T002, T003, T004) can be executed in parallel as they are independent component installations.
