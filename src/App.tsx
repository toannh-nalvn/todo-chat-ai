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