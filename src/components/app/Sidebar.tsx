import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, ShoppingCart, ChevronDown, MoreHorizontal, Folder, DollarSign, Kanban, NotebookPen, Hotel, Settings, LogOut } from "lucide-react"

interface MenuItem {
  id: string
  label: string
  icon?: React.ElementType
  link?: string
  isCollapsible?: boolean
  children?: MenuItem[]
  badge?: string | number
}

const menuItems: MenuItem[] = [
  {
    id: "dashboards",
    label: "Dashboards",
    icon: LayoutDashboard,
    isCollapsible: true,
    children: [
      { id: "analytics", label: "Analytics", link: "/dashboards/analytics" },
      { id: "hotel", label: "Hotel Dashboard", link: "/dashboards/hotel", badge: "Coming" },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: ShoppingCart,
    isCollapsible: true,
    children: [
      { id: "products", label: "Products", link: "/ecommerce/products" },
      { id: "orders", label: "Orders", link: "/ecommerce/orders" },
    ],
  },
  {
    id: "sales",
    label: "Sales",
    icon: DollarSign,
    isCollapsible: true,
    children: [
      { id: "overview", label: "Overview", link: "/sales/overview" },
      { id: "deals", label: "Deals", link: "/sales/deals" },
    ],
  },
  {
    id: "project-management",
    label: "Project Management",
    icon: Kanban,
    isCollapsible: true,
    children: [
      { id: "kanban", label: "Kanban", link: "/pm/kanban", badge: "New" },
      { id: "gantt", label: "Gantt Chart", link: "/pm/gantt" },
    ],
  },
  { id: "file-manager", label: "File Manager", icon: Folder, link: "/file-manager" },
  { id: "crypto", label: "Crypto", icon: DollarSign, link: "/crypto" },
  { id: "notes", label: "Notes", icon: NotebookPen, link: "/notes", badge: 8 },
]

export function Sidebar() {
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null)

  const handleCollapsibleToggle = (id: string) => {
    setOpenCollapsible(openCollapsible === id ? null : id)
  }

  return (
    <div className="flex h-screen flex-col border-r w-72 bg-background">
      {/* 1. Header của Sidebar */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Shadcn UI Kit</h2>
      </div>

      {/* 2. Khu vực Menu (cuộn được) */}
      <ScrollArea className="flex-1 px-4 py-2">
        <nav className="grid gap-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.isCollapsible ? (
                <Collapsible
                  open={openCollapsible === item.id}
                  onOpenChange={() => handleCollapsibleToggle(item.id)}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                    >
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      {item.label}
                      {item.badge && (
                        <Badge className="ml-auto flex h-5 w-9 shrink-0 items-center justify-center rounded-full">
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronDown
                        className={`ml-auto h-4 w-4 transition-transform ${openCollapsible === item.id ? "rotate-180" : ""}`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                    <div className="grid gap-1 pl-8 py-1">
                      {item.children?.map((child) => (
                        <Button
                          key={child.id}
                          variant="ghost"
                          className="w-full justify-start text-left"
                        >
                          {child.label}
                          {child.badge && (
                            <Badge className="ml-auto flex h-5 w-9 shrink-0 items-center justify-center rounded-full">
                              {child.badge}
                            </Badge>
                          )}
                        </Button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left"
                >
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  {item.label}
                  {item.badge && (
                    <Badge className="ml-auto flex h-5 w-9 shrink-0 items-center justify-center rounded-full">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* 3. Khu vực CTA */}
      <div className="p-4 border-t">
        <div className="p-4 rounded-lg bg-muted">
          <h4 className="font-semibold mb-2">Unlock</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Unlock lifetime access to all dashboards, templates and components.
          </p>
          <Button className="w-full">Get Shadcn UI Kit</Button>
        </div>
      </div>

      {/* 4. Khu vực User Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>TB</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Toby B.</p>
              <p className="text-xs text-muted-foreground">hello@toby.com</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem> <LogOut className="mr-2 h-4 w-4" /> Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}