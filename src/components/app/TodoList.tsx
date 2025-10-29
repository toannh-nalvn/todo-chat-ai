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
