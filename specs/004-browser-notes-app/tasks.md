# Tasks: Browser Notes Application

**Input**: Design documents from `/specs/004-browser-notes-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md, quickstart.md

**Tests**: The feature specification does not explicitly request automated tests for this static UI. Verification will be done through visual inspection and manual testing of `localStorage` persistence.

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

- [x] T001 Thực thi lệnh shell: `pnpm dlx shadcn-ui@latest add input`
- [x] T002 Thực thi lệnh shell: `pnpm dlx shadcn-ui@latest add textarea`
- [x] T003 Thực thi lệnh shell: `pnpm dlx shadcn-ui@latest add scroll-area`
- [x] T004 Thực thi lệnh shell: `pnpm dlx shadcn-ui@latest add separator`

---

## Phase 2: Foundational (Định nghĩa Cấu trúc)

**Purpose**: Create the main component file for the Notes Application.

**⚠️ CRITICAL**: This task must be completed before building the UI and logic.

- [x] T005 Tạo tệp mới tại `src/components/app/NotesApp.tsx`

**Checkpoint**: `NotesApp.tsx` file is created.

---

## Phase 3: User Story 1 - Create and View New Note (Priority: P1) 🎯 MVP

**Goal**: Implement the core UI, state management, and auto-save/load logic for creating and viewing notes.

**Independent Test**: Open the application, click "+ New Note", type a title and content, verify the note appears in the sidebar and its content is saved. Close and reopen the browser to confirm persistence.

### Implementation for User Story 1

- [x] T006 [US1] Ghi (overwrite) toàn bộ nội dung sau vào tệp `src/components/app/NotesApp.tsx` (bao gồm UI, State, và Logic tự động lưu):
    ```tsx
    import { useState, useEffect, useMemo } from "react"
    import { Button } from "@/components/ui/button"
    import { Input } from "@/components/ui/input"
    import { Textarea } from "@/components/ui/textarea"
    import { ScrollArea } from "@/components/ui/scroll-area"
    import { Separator } from "@/components/ui/separator"
    import { Plus, Trash2 } from "lucide-react"
    import { cn } from "@/lib/utils"

    // 1. Định nghĩa cấu trúc dữ liệu
    interface Note {
      id: string
      title: string
      content: string
      modifiedAt: number // Dùng timestamp để sắp xếp
    }

    const STORAGE_KEY = "browser-notes"

    export function NotesApp() {
      // State cho tất cả ghi chú
      const [notes, setNotes] = useState<Note[]>([])
      // State cho ID của ghi chú đang được chọn
      const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)

      // 3. Logic LocalStorage (Tải dữ liệu khi mở app)
      useEffect(() => {
        const storedNotes = localStorage.getItem(STORAGE_KEY)
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes))
        }
      }, [])

      // 3. Logic LocalStorage (Lưu dữ liệu khi state 'notes' thay đổi)
      useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
      }, [notes])

      // 4. Logic Thêm Ghi chú mới
      const handleNewNote = () => {
        const newNote: Note = {
          id: Date.now().toString(),
          title: "New Note",
          content: "Write your note here...",
          modifiedAt: Date.now(),
        }
        setNotes([newNote, ...notes])
        setSelectedNoteId(newNote.id)
      }

      // 5. Logic Chọn Ghi chú
      const handleSelectNote = (id: string) => {
        setSelectedNoteId(id)
      }

      // 6. Logic Xóa Ghi chú
      const handleDeleteNote = (idToDelete: string) => {
        setNotes(notes.filter((note) => note.id !== idToDelete))
        // Nếu ghi chú bị xóa là ghi chú đang chọn, bỏ chọn nó
        if (selectedNoteId === idToDelete) {
          setSelectedNoteId(null)
        }
      }

      // 7. Logic Tự động lưu khi sửa đổi
      const handleNoteChange = (field: "title" | "content", value: string) => {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === selectedNoteId
              ? { ...note, [field]: value, modifiedAt: Date.now() }
              : note
          )
        )
      }

      // 8. Tìm ghi chú đang được chọn (để hiển thị)
      const selectedNote = useMemo(
        () => notes.find((note) => note.id === selectedNoteId),
        [notes, selectedNoteId]
      )

      // Sắp xếp ghi chú: ghi chú mới nhất lên đầu
      const sortedNotes = useMemo(
        () => [...notes].sort((a, b) => b.modifiedAt - a.modifiedAt),
        [notes]
      )

      return (
        <div className="flex flex-col h-screen">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b">
            <h1 className="text-2xl font-bold">Browser Notes</h1>
            <Button onClick={handleNewNote}>
              <Plus className="mr-2 h-4 w-4" /> New Note
            </Button>
          </header>
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar (Danh sách Ghi chú) */}
            <aside className="w-1/3 border-r overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-semibold">My Notes</h2>
              </div>
              <ScrollArea className="h-[calc(100vh-120px)]">
                <div className="space-y-2 p-4 pt-0">
                  {sortedNotes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => handleSelectNote(note.id)}
                      className={cn(
                        "p-4 rounded-lg cursor-pointer border",
                        selectedNoteId === note.id ? "bg-muted" : "hover:bg-muted/50"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold truncate">{note.title}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation(); // Ngăn không cho sự kiện click lan ra ngoài
                            handleDeleteNote(note.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(note.modifiedAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </aside>
            {/* Main Content (Trình soạn thảo) */}
            <main className="flex-1 flex flex-col p-4">
              {selectedNote ? (
                <>
                  <Input
                    placeholder="Note Title"
                    className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 mb-4"
                    value={selectedNote.title}
                    onChange={(e) => handleNoteChange("title", e.target.value)}
                  />
                  <Textarea
                    placeholder="Write your note here..."
                    className="flex-1 border-none shadow-none focus-visible:ring-0 text-base"
                    value={selectedNote.content}
                    onChange={(e) => handleNoteChange("content", e.target.value)}
                  />
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">
                    Select a note to edit or create a new one.
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      )
    }
    ```

**Checkpoint**: User Story 1 UI, state, and core logic are implemented in `NotesApp.tsx`.

---

## Phase 4: User Story 2 - Select and Edit Existing Note (Priority: P1)

**Goal**: Ensure existing notes can be selected, edited, and changes are automatically saved.

**Independent Test**: Create multiple notes, select one, verify its content loads, modify it, and confirm auto-save.

### Implementation for User Story 2

- [x] T007 [US2] (Covered by T006) - The logic for selecting and editing existing notes is integrated into the `NotesApp.tsx` component in T006.

**Checkpoint**: User Story 2 functionality is covered.

---

## Phase 5: User Story 3 - Delete Note (Priority: P2)

**Goal**: Implement the functionality to delete notes.

**Independent Test**: Create a note, delete it, and verify it no longer appears in the sidebar or `localStorage`.

### Implementation for User Story 3

- [x] T008 [US3] (Covered by T006) - The `handleDeleteNote` function is integrated into the `NotesApp.tsx` component in T006.

**Checkpoint**: User Story 3 functionality is covered.

---

## Phase 6: User Story 4 - Persistent Notes (Priority: P1)

**Goal**: Ensure notes are automatically saved and loaded from `localStorage`.

**Independent Test**: Create/edit notes, close the browser, reopen it, and verify all notes are present and their content is correct.

### Implementation for User Story 4

- [x] T009 [US4] (Covered by T006) - The `useEffect` hooks for `localStorage` persistence are integrated into the `NotesApp.tsx` component in T006.

**Checkpoint**: User Story 4 functionality is covered.

---

## Phase 7: Tích hợp vào `App.tsx`

**Goal**: Integrate the `NotesApp` component into `App.tsx`.

**Independent Test**: Verify that the `NotesApp` component is rendered correctly within `App.tsx` and the overall application layout is maintained.

### Implementation for Integration

- [x] T010 Ghi đè (overwrite) tệp `src/App.tsx` để render `NotesApp`:
    ```tsx
    import { NotesApp } from "@/components/app/NotesApp"

    function App() {
      return (
        // Bỏ các lề và nền cũ để NotesApp chiếm toàn bộ màn hình
        <div className="min-h-screen bg-background">
          <NotesApp />
        </div>
      )
    }

    export default App
    ```
- [x] T011 In ra thông báo cho người dùng: "Hoàn tất! Ứng dụng Ghi chú đã sẵn sàng. Chạy 'pnpm dev' để bắt đầu."

**Checkpoint**: `NotesApp` is integrated into `App.tsx` and the user is informed.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Integration (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Covered by User Story 1 implementation.
- **User Story 3 (P2)**: Covered by User Story 1 implementation.
- **User Story 4 (P1)**: Covered by User Story 1 implementation.

### Within Each User Story

- Tasks T001, T002, T003, T004 can be executed in parallel.
- Task T005 depends on T001, T002, T003, T004.
- Task T006 depends on T005.
- Task T010 depends on T006.
- Task T011 depends on T010.

### Parallel Opportunities

- T001, T002, T003, T004 can run in parallel.

---

## Parallel Example: Setup

```bash
# Install shadcn/ui components in parallel:
Task: "Thực thi lệnh shell: pnpm dlx shadcn-ui@latest add input"
Task: "Thực thi lệnh shell: pnpm dlx shadcn-ui@latest add textarea"
Task: "Thực thi lệnh shell: pnpm dlx shadcn-ui@latest add scroll-area"
Task: "Thực thi lệnh shell: pnpm dlx shadcn-ui@latest add separator"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently (which covers US2, US3, US4 core logic)
5. Complete Phase 7: Integration
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Phase 3) → Test independently → Deploy/Demo (MVP!)
3. Add Integration (Phase 7) → Test independently → Deploy/Demo

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Phase 3)
   - Developer B: Integration (Phase 7) (can start after A completes T006)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
