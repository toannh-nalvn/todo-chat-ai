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
