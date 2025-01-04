import {
  Banknote,
  BrickWall,
  Calendar,
  ChartBar,
  FolderArchive,
  GoalIcon,
  Home,
  Inbox,
  PlusCircle,
  Search,
  Settings,
  ShoppingBagIcon,
  Wallet,
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { cn } from "../lib/utils";



// Menu items.
const items = [
  {
      title: "Dachboard",
      url: "/home",
      icon: Home,
  },
  {
      title: "Transactions",
      url: "/transactions",
      icon: ChartBar, // Use appropriate icon
  },
  {
      title: "Budgets",
      url: "/budgets",
      icon: Wallet,
  },
  {
    title: "Shopping List",
    url: "/shoppingList",
    icon: Wallet,
},
  
];

export function AppSidebar({ path }: { path: string }) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="flex-row item-center justify-center">
          <Banknote className="text-sky-500" size={40} />
          <h1 className="font-bold text-3xl text-sky-500">
            {" "}
            Masroofy{" "}
          </h1>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="" isActive={true} asChild>
                    <a
                      className={cn("p-3 my-1 hover:bg-sky-500 hover:text-white", {
                        "bg-sky-500 text-white": (
                          item.url === "/" ? path === "/" :
                          (path.split("/").at(-1) as string).includes(item.url.split("/").at(-1) as string)) ? true : false ,
                      })}
                      href={item.url}
                    >
                      <item.icon size={30} />
                      <span className="text-md">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
