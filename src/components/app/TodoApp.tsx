import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Trash2 } from "lucide-react" // Thêm icon cho đẹp

// 1. Định nghĩa cấu trúc dữ liệu
interface Todo {
  id: string
  text: string
  completed: boolean
}

// Key để lưu trong localStorage
const STORAGE_KEY = "todos"

export function TodoApp() {
  // 2. State cho danh sách todos
  const [todos, setTodos] = useState<Todo[]>([])
  // State cho ô input
  const [newTodoText, setNewTodoText] = useState("")

  // 3. Logic LocalStorage (Tải dữ liệu khi mở app)
  useEffect(() => {
    const storedTodos = localStorage.getItem(STORAGE_KEY)
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  // 3. Logic LocalStorage (Lưu dữ liệu khi state 'todos' thay đổi)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // 4. Logic Thêm Todo
  const handleAddTodo = () => {
    if (newTodoText.trim() === "") return // Không thêm nếu input rỗng

    const newTodo: Todo = {
      id: Date.now().toString(), // Dùng timestamp làm ID đơn giản
      text: newTodoText,
      completed: false,
    }
    setTodos([...todos, newTodo])
    setNewTodoText("") // Xóa nội dung ô input
  }

  // 5. Logic Đánh dấu Hoàn thành
  const handleToggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  // 6. Logic Xóa Todo
  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <Card className="w-full max-w-md mx-auto my-12">
      <CardHeader>
        <CardTitle>Todo App (shadcn/ui)</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Phần Input để thêm Todo */}
        <div className="flex w-full items-center space-x-2 mb-6">
          <Input
            type="text"
            placeholder="Thêm một việc làm mới..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
          />
          <Button onClick={handleAddTodo}>Thêm</Button>
        </div>

        {/* Phần Danh sách Todo */}
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center space-x-3 p-3 rounded-md border"
            >
              <Checkbox
                id={todo.id}
                checked={todo.completed}
                onCheckedChange={() => handleToggleComplete(todo.id)}
              />
              <label
                htmlFor={todo.id}
                className={`flex-1 text-sm font-medium ${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {todo.text}
              </label>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        {/* Thông báo nếu không có todo */}
        {todos.length === 0 && (
          <p className="text-center text-muted-foreground mt-4">
            Chưa có việc làm nào.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
