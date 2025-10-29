# Tasks: Static Todo List UI

**Input**: Design documents from `/specs/003-todo-list-ui/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md, quickstart.md

**Tests**: The feature specification does not explicitly request automated tests for this static UI. Verification will be done through visual inspection.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Cài đặt Components)

**Purpose**: Install necessary `shadcn/ui` components.

- [x] T001 Thực thi lệnh shell: `pnpm dlx shadcn@latest add tabs`
- [x] T002 Thực thi lệnh shell: `pnpm dlx shadcn@latest add toggle-group`

---

## Phase 2: Foundational (Tạo Component `TodoList.tsx`)

**Purpose**: Create the main component file for the Todo List UI.

**⚠️ CRITICAL**: This task must be completed before building the UI.

- [x] T003 Tạo tệp mới tại `src/components/app/TodoList.tsx`

**Checkpoint**: `TodoList.tsx` file is created.

---

## Phase 3: User Story 1 - View Static Todo List (Priority: P1) 🎯 MVP

**Goal**: Build the static UI for the Todo List, including title, filter tabs, toolbar, and task cards.

**Independent Test**: Visually inspect the rendered UI to ensure all specified elements (title, tabs, toolbar, task cards with details) are present and correctly styled.

### Implementation for User Story 1

- [x] T004 [US1] Ghi (overwrite) toàn bộ nội dung sau vào tệp `src/components/app/TodoList.tsx`:
    ```tsx
    import { Badge } from "@/components/ui/badge"
    import { Button } from "@/components/ui/button"
    import { Card } from "@/components/ui/card"
    import { Checkbox } from "@/components/ui/checkbox"
    import { Input } from "@/components/ui/input"
    import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
    import { ToggleGroup, ToggleGroupItem, } from "@/components/ui/toggle-group"
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
    import { Search, List, LayoutGrid, CalendarDays, Users, Star, } from "lucide-react"

    // Component con để render 1 task (cho code sạch hơn)
    function TaskItem() {
      return (
        <Card className="p-4 flex items-center space-x-4 hover:bg-muted/50 transition-colors">
          <Checkbox id="task1" />
          <div className="flex-1 space-y-3">
            <div className="flex justify-between items-center">
              <label htmlFor="task1" className="font-medium cursor-pointer" >
                Design homepage layout <Star className="inline w-4 h-4 ml-1 text-yellow-500" />
              </label>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-purple-100 text-purple-700">In Progress</Badge>
                <Badge variant="outline" className="bg-red-100 text-red-700">High</Badge>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>EC</AvatarFallback>
                </Avatar>
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>LW</AvatarFallback>
                </Avatar>
                <span>Emily Carter, Liam Walker</span>
              </div>
              <div className="flex items-center space-x-1">
                <CalendarDays className="w-4 h-4" />
                <span>Jun 5, 2023</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Subtasks: 1/2</span>
              </div>
            </div>
          </div>
        </Card>
      )
    }

    // Component chính
    export function TodoList() {
      return (
        <div className="flex flex-col h-full">
          {/* 1. Tiêu đề và Tabs */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-4">Todo List</h1>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* 2. Thanh công cụ (Search và View) */}
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search tasks..." className="pl-9" />
            </div>
            <ToggleGroup type="single" defaultValue="list" variant="outline">
              <ToggleGroupItem value="list" aria-label="Toggle list">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="grid" aria-label="Toggle grid">
                <LayoutGrid className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* 3. Danh sách công việc (Tĩnh) */}
          <div className="flex-1 space-y-4 overflow-auto pr-2">
            <TaskItem />
            {/* Thêm 1 task nữa làm mẫu */}
            <Card className="p-4 flex items-center space-x-4 hover:bg-muted/50 transition-colors">
              <Checkbox id="task2" />
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-center">
                  <label htmlFor="task2" className="font-medium cursor-pointer">
                    Conduct user interviews
                  </label>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-700">Pending</Badge>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-700">Medium</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="https://github.com/vercel.png" />
                      <AvatarFallback>LW</AvatarFallback>
                    </Avatar>
                    <span>Liam Walker</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CalendarDays className="w-4 h-4" />
                    <span>Jun 12, 2023</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>Subtasks: 1/2</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )
    }
    ```

**Checkpoint**: User Story 1 UI is implemented in `TodoList.tsx`.

---

## Phase 4: User Story 1 - View Static Todo List (Priority: P1)

**Goal**: Integrate the `TodoList` component into `App.tsx`.

**Independent Test**: Verify that the `TodoList` component is rendered correctly within the `<main>` section of `App.tsx` and the overall application layout is maintained.

### Implementation for User Story 1

- [x] T005 [US1] Ghi đè (overwrite) tệp `src/App.tsx` để render `TodoList`:
    ```tsx
    import { Sidebar } from "@/components/app/Sidebar"
    import { TodoList } from "@/components/app/TodoList"

    function App() {
      return (
        <div className="flex min-h-screen bg-background">
          {/* Cột Sidebar */}
          <Sidebar />
          {/* Cột Nội dung chính */}
          <main className="flex-1 p-8">
            {/* Thay thế nội dung cũ bằng TodoList component */}
            <TodoList />
          </main>
        </div>
      )
    }

    export default App
    ```
- [x] T006 [US1] In ra thông báo cho người dùng: "Hoàn tất! Giao diện tĩnh cho Todo List đã được tích hợp. Chạy 'pnpm dev' để xem kết quả."

**Checkpoint**: `TodoList` is integrated into `App.tsx` and the user is informed.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Tasks T001 and T002 can be executed in parallel.
- Task T003 depends on T001 and T002.
- Task T004 depends on T003.
- Task T005 depends on T004.
- Task T006 depends on T005.

### Parallel Opportunities

- T001 and T002 can run in parallel.

---

## Parallel Example: User Story 1

```bash
# Install shadcn/ui components in parallel:
Task: "Thực thi lệnh shell: pnpm dlx shadcn-ui@latest add tabs"
Task: "Thực thi lệnh shell: pnpm dlx shadcn-ui@latest add toggle-group"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. Complete Phase 4: User Story 1
5. **STOP and VALIDATE**: Test User Story 1 independently
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Phases 3 & 4) → Test independently → Deploy/Demo (MVP!)

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Phases 3 & 4)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
