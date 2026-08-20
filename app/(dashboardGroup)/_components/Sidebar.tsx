"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { logout } from "@/service/logout";

import {
  LayoutDashboard,
  FileText,
  Crown,
  Users,
  Settings,
  User,
  LogOut,
} from "lucide-react";

import Link from "next/link";
import { toast } from "sonner";


const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Posts",
    url: "/dashboard/my-posts",
    icon: FileText,
  },
  {
    title: "Premium Posts",
    url: "/premium",
    icon: Crown,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
];

export function AppSidebar() {
  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logout successful");

      window.location.href = "/login";
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout failed:", error);
    }
  };

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader>
        <div className="px-4 py-4 text-xl font-bold">My Dashboard</div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/profile">
                    <User />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
