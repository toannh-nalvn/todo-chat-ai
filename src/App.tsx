import { TodoApp } from "@/components/app/TodoApp"

function App() {
  return (
    // Đặt một nền tối nhẹ để component Card nổi bật
    <div className="min-h-screen bg-muted/40">
      <TodoApp />
    </div>
  )
}

export default App