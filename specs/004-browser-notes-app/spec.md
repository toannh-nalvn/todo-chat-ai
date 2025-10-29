# Feature Specification: Browser Notes Application

**Feature Branch**: `004-browser-notes-app`  
**Created**: October 29, 2025  
**Status**: Draft  
**Input**: User description: "Mục tiêu: Xây dựng một ứng dụng \"Browser Notes\" (Ghi chú Trình duyệt) với giao diện 3 cột. Yêu cầu chức năng (Features): 1. **Header:** Hiển thị tiêu đề \"Browser Notes\" và một nút `+ New Note` ở bên phải. 2. **Danh sách Ghi chú (Sidebar):** * Hiển thị một danh sách các ghi chú đã lưu, với tiêu đề và ngày cập nhật. * Cho phép chọn một ghi chú (highlight) để xem/sửa. * Cho phép xóa ghi chú bằng một nút \"Delete\" (icon thùng rác) trên mỗi mục. 3. **Trình soạn thảo (Editor):** * Hiển thị một ô `Input` cho Tiêu đề (Title) của ghi chú. * Hiển thị một ô `Textarea` cho Nội dung (Content) của ghi chú. * Nếu không có ghi chú nào được chọn, hiển thị một thông báo placeholder. 4. **Logic (Tự động lưu):** * Khi người dùng nhấp `+ New Note`, một ghi chú mới được tạo, thêm vào danh sách, và được chọn ngay lập tức. * Khi người dùng nhấp vào một ghi chú trong danh sách, nội dung của nó được tải vào Trình soạn thảo. * Bất kỳ thay đổi nào trong `Input` (Tiêu đề) hoặc `Textarea` (Nội dung) đều phải được **tự động lưu** vào `localStorage`. * Dữ liệu phải được tải từ `localStorage` khi khởi động ứng dụng. Yêu cầu kỹ thuật (Constraints): 1. **Tech Stack:** Phải sử dụng React (Hooks: `useState`, `useEffect`) và TypeScript. 2. **UI Components:** Phải sử dụng các component `shadcn/ui` (Button, Input, Textarea, ScrollArea, Separator, Card). 3. **Cấu trúc tệp:** Tạo một component chính `NotesApp.tsx` và render nó trong `App.tsx`.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create and View New Note (Priority: P1)

As a user, I want to create a new note, see it in the list, and be able to edit its title and content, so I can quickly capture my thoughts.

**Why this priority**: This is the core functionality for creating and interacting with notes, essential for an MVP.

**Independent Test**: Can be fully tested by opening the application, clicking "+ New Note", typing a title and content, and verifying the note appears in the sidebar and its content is saved.

**Acceptance Scenarios**:

1.  **Given** the application is running, **When** I click the "+ New Note" button, **Then** a new empty note appears in the sidebar, is automatically selected, and the editor shows empty title/content fields.
2.  **Given** a new note is selected in the editor, **When** I type into the Title input and Content textarea, **Then** the changes are automatically saved to `localStorage` and reflected in the sidebar's note title.

---


### User Story 2 - Select and Edit Existing Note (Priority: P1)

As a user, I want to select an existing note from the sidebar, view its content in the editor, and make changes that are automatically saved, so I can manage my saved notes.

**Why this priority**: This is fundamental for interacting with previously created notes.

**Independent Test**: Can be fully tested by creating multiple notes, selecting one, verifying its content loads, modifying it, and confirming auto-save.

**Acceptance Scenarios**:

1.  **Given** multiple notes exist in the sidebar, **When** I click on a note in the sidebar, **Then** its title and content are loaded into the editor, and the note is highlighted in the sidebar.
2.  **Given** an existing note is selected and its content is in the editor, **When** I modify the Title input or Content textarea, **Then** the changes are automatically saved to `localStorage` and reflected in the sidebar's note title.

---


### User Story 3 - Delete Note (Priority: P2)

As a user, I want to delete an unwanted note from the sidebar, so I can keep my notes organized.

**Why this priority**: Important for managing notes, but not as critical as creating and editing for an MVP.

**Independent Test**: Can be tested by creating a note, deleting it, and verifying it no longer appears in the sidebar or `localStorage`.

**Acceptance Scenarios**:

1.  **Given** a note exists in the sidebar, **When** I click the "Delete" (trash icon) button next to the note, **Then** the note is removed from the sidebar and `localStorage`.
2.  **Given** the last note is deleted, **When** the sidebar becomes empty, **Then** the editor displays a placeholder message.

---


### User Story 4 - Persistent Notes (Priority: P1)

As a user, I want my notes to be automatically saved and loaded when I close and reopen the browser, so I don't lose my work.

**Why this priority**: Data persistence is crucial for any notes application.

**Independent Test**: Can be tested by creating/editing notes, closing the browser, reopening it, and verifying all notes are present and their content is correct.

**Acceptance Scenarios**:

1.  **Given** notes are saved in `localStorage`, **When** the application starts, **Then** all notes are loaded and displayed in the sidebar.

---


### Edge Cases

- What happens if `localStorage` is full or unavailable? (System should gracefully handle, perhaps with a warning).
- What happens if there are no notes to display? (The sidebar should show an empty state, and the editor should show a placeholder).
- How does the UI adapt to different screen sizes? (Should be responsive).
- What if a note's title is very long? (Should truncate or wrap in the sidebar).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display "Browser Notes" title in the header.
- **FR-002**: System MUST display a "+ New Note" button in the header.
- **FR-003**: System MUST display a list of saved notes in a sidebar, showing each note's title and last updated date.
- **FR-004**: System MUST allow selecting a note from the sidebar, highlighting the selected note.
- **FR-005**: System MUST display a "Delete" (trash icon) button next to each note in the sidebar.
- **FR-006**: System MUST display an `Input` field for the note's Title in the editor.
- **FR-007**: System MUST display a `Textarea` field for the note's Content in the editor.
- **FR-008**: System MUST display a placeholder message in the editor if no note is selected.
- **FR-009**: When "+ New Note" is clicked, a new empty note MUST be created, added to the list, and automatically selected.
- **FR-010**: When a note in the sidebar is clicked, its title and content MUST be loaded into the editor.
- **FR-011**: Any changes in the Title `Input` or Content `Textarea` MUST be automatically saved to `localStorage`.
- **FR-012**: All notes data MUST be loaded from `localStorage` when the application starts.
- **FR-013**: When a note's "Delete" button is clicked, the note MUST be removed from the list and `localStorage`.

### Key Entities *(include if feature involves data)*

- **Note**: Represents a single browser note.
    *   Attributes:
        *   `id`: Unique identifier (e.g., UUID).
        *   `title`: The title of the note (string).
        *   `content`: The main body of the note (string).
        *   `updatedAt`: Timestamp of the last update (Date string or number).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create a new note and begin typing within 2 seconds of clicking "+ New Note".
- **SC-002**: All changes to note title and content are automatically saved to `localStorage` within 500ms of user input ceasing.
- **SC-003**: All previously saved notes are loaded and displayed correctly in the sidebar within 1 second of application startup.
- **SC-004**: Deleting a note removes it from the UI and `localStorage` without any visible errors or delays.
- **SC-005**: The application UI remains responsive and functional across common desktop browser window sizes.