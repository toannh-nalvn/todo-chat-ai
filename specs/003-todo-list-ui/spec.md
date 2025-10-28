# Feature Specification: Static Todo List UI

**Feature Branch**: `003-todo-list-ui`  
**Created**: October 28, 2025  
**Status**: Draft  
**Input**: User description: "Mục tiêu: Xây dựng giao diện UI (TĨNH) cho khu vực nội dung chính \"Todo List\" dựa theo hình ảnh. Yêu cầu chức năng (Features): 1. **Tiêu đề:** Hiển thị tiêu đề chính \"Todo List\". 2. **Bộ lọc (Tabs):** Hiển thị các tab lọc: \"All\", \"Pending\", \"In Progress\", \"Completed\". 3. **Thanh công cụ (Toolbar):** * Bên phải, hiển thị một ô `Input` tìm kiếm (Search tasks...). * Hiển thị hai nút `Toggle` để chuyển đổi dạng xem (List và Grid). 4. **Danh sách công việc (Task List):** * Hiển thị một danh sách các công việc. * Mỗi công việc phải là một `Card`. 5. **Chi tiết một công việc (Task Item):** * Mỗi card công việc phải hiển thị (dưới dạng tĩnh): * Một `Checkbox`. * Tiêu đề công việc (ví dụ: \"Design homepage layout\"). * Danh sách người thực hiện (`Avatar`). * Ngày hết hạn (Date). * Tiến độ công việc con (Subtasks). * Một `Badge` cho trạng thái (ví dụ: \"In Progress\"). * Một `Badge` cho độ ưu tiên (ví dụ: \"High\"). Yêu cầu kỹ thuật (Constraints): 1. **Tích hợp:** Giao diện này phải được đặt BÊN TRONG component `<main>` của tệp `App.tsx` hiện tại. 2. **UI Components:** Phải sử dụng các component từ `shadcn/ui`. 3. **Tĩnh:** Đây là kế hoạch xây dựng UI tĩnh. Không yêu cầu logic (state, filter, add, delete). 4. **Cấu trúc tệp:** Tạo một component chính `TodoList.tsx` và render nó bên trong `App.tsx`.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Static Todo List (Priority: P1)

As a user, I want to see a static representation of a todo list, including a title, filter tabs, a toolbar with search and view toggles, and a list of task cards with detailed information, so I can understand the layout and available information.

**Why this priority**: This is the foundational UI for the main content area. Without it, there is no visual representation of the todo list.

**Independent Test**: Can be fully tested by visually inspecting the rendered UI to ensure all specified elements (title, tabs, toolbar, task cards with details) are present and correctly styled.

**Acceptance Scenarios**:

1. **Given** the application is running and the main content area is displayed, **When** I view the page, **Then** I see the title "Todo List" at the top.
2. **Given** the main content area is displayed, **When** I look at the filter section, **Then** I see "All", "Pending", "In Progress", and "Completed" tabs.
3. **Given** the main content area is displayed, **When** I look at the toolbar, **Then** I see a search input field and two toggle buttons for List and Grid view.
4. **Given** the main content area is displayed, **When** I view the task list, **Then** I see multiple task cards.
5. **Given** I inspect a single task card, **When** I look at its details, **Then** I see a checkbox, task title, assignee avatars, due date, subtasks progress, a status badge, and a priority badge.

---

### Edge Cases

- What happens if there are no tasks to display? (The task list area should show an empty state message).
- How does the layout adapt to different screen sizes? (Should be responsive, though this is a static UI).
- What happens if a task item is missing some data (e.g., no assignees, no due date)? (Should gracefully handle missing data, perhaps by hiding the element or showing a placeholder).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the main title "Todo List".
- **FR-002**: System MUST display filter tabs: "All", "Pending", "In Progress", "Completed".
- **FR-003**: System MUST display a search `Input` field in the toolbar.
- **FR-004**: System MUST display two `Toggle` buttons for List and Grid view in the toolbar.
- **FR-005**: System MUST display a list of tasks, where each task is represented by a `Card` component.
- **FR-006**: Each task `Card` MUST display a `Checkbox`.
- **FR-007**: Each task `Card` MUST display a task title.
- **FR-008**: Each task `Card` MUST display a list of assignees using `Avatar` components.
- **FR-009**: Each task `Card` MUST display a due date.
- **FR-010**: Each task `Card` MUST display subtasks progress.
- **FR-011**: Each task `Card` MUST display a status `Badge` (e.g., "In Progress").
- **FR-012**: Each task `Card` MUST display a priority `Badge` (e.g., "High").

### Key Entities *(include if feature involves data)*

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

## Assumptions

- The design image for the Todo List UI is available and will be used as a reference for visual layout and styling.
- All necessary `shadcn/ui` components are installed and configured.
- The UI is static; no dynamic behavior (filtering, searching, adding/deleting tasks) is required in this phase.
- The `TodoList.tsx` component will be rendered within the `<main>` section of `App.tsx`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The static Todo List UI renders correctly and matches the provided design image within 1 second of being displayed.
- **SC-002**: All specified UI elements (title, tabs, toolbar, task cards, and their details) are present and visually distinct.
- **SC-003**: The `TodoList.tsx` component is successfully integrated into `App.tsx` without breaking the existing layout.
- **SC-004**: The UI is responsive and maintains its structure on common screen sizes (e.g., desktop, tablet).