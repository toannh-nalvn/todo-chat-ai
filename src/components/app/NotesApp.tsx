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
