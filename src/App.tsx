import { Sidebar } from "@/components/app/Sidebar"

function App() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Cột Sidebar */}
      <Sidebar />
      {/* Cột Nội dung chính */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Main Content Area</h1>
        <p className="text-muted-foreground">
          Nội dung chính sẽ được hiển thị ở đây.
        </p>
      </main>
    </div>
  )
}

export default App
