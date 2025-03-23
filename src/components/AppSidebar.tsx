import {
    Calendar,
    Home,
    MessageSquare,
    MessagesSquare,
    UsersRound,
    Volume2,
    Flag,
    Settings,
    LogOut,
    Database,
    HandCoins,
    User,
  } from "lucide-react";
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
  } from "@/components/ui/sidebar";
//   import { ThemeToggle } from "./theme/theme-toggle";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu";
  import { Button } from "./ui/button";
  import Link from "next/link";
  import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { signOutforcookie } from "@/app/action";
  
  const items = [
    { title: "Profile", url: "/profile", icon: User ,public:true},
    // { title: "Announcement", url: "/announcement", icon: Volume2 ,public:true},
    // { title: "Tickets", url: "/tickets", icon: HandCoins ,public:true},
    // { title: "Conversation", url: "/conversation", icon: MessageSquare },
    // { title: "Group", url: "/group", icon: UsersRound },
    // {
    //   title: "Message Templates",
    //   url: "/message-templates",
    //   icon: MessagesSquare,
    // },
    // { title: "Bulk Messaging", url: "/bulk_Messaging", icon: Volume2 },
    // { title: "Analytics", url: "/analytics", icon: Flag },
    // { title: "Plans", url: "/plans", icon: HandCoins ,public:true},
  
    // { title: "Dashboard", url: "/admin/dashboard", icon: Database , admin:true},
    // { title: "Plans", url: "/admin/plans", icon: HandCoins , admin:true},
  ];
  
  export function AppSidebar({ pathSegments }: { pathSegments: string[] }) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isAdmin = user.role === "admin"; 

    // Disable state for menu items
    const isDisabled = false;

    async function signOut(): Promise<void> {
      const deleted=await signOutforcookie();
      if(deleted){
        
        localStorage.removeItem("user");
      }
      // document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      window.location.href = "/login";
    }

    return (
      <Sidebar
        className="dark:bg-gray-900"
        variant="sidebar"
        collapsible="icon"
      >
        <SidebarContent className="dark:bg-gray-900">
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
              Application
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0">
                {/* Home Menu */}
                <SidebarMenuItem key="home">
                  <SidebarMenuButton asChild>
                    <a
                      href="/"
                      className="flex items-center p-5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <Home className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-300" />
                      <span className="text-sm font-medium">Home</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Render Admin Menu Items */}
                {isAdmin && (
                  <>
                    <SidebarMenuItem key="announcement">
                      <SidebarMenuButton asChild>
                        <a
                          href="/announcement"
                          className="flex items-center p-5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <Volume2 className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-300" />
                          <span className="text-sm font-medium">
                            Announcement
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem key="tickets">
                      <SidebarMenuButton asChild>
                        <a
                          href="/tickets"
                          className="flex items-center p-5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <HandCoins className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-300" />
                          <span className="text-sm font-medium">Tickets</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}

                {/* Render Non-Admin Menu Items */}
                {items.map((item) => {
                  const isActive = `/${pathSegments[0]}` === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild disabled={isDisabled}>
                        <a
                          href={isDisabled ? "#" : item.url}
                          className={`flex items-center p-5 rounded-md ${
                            isActive
                              ? "bg-muted dark:bg-gray-700 text-primary"
                              : isDisabled
                              ? "cursor-not-allowed opacity-50"
                              : "hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          <item.icon className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-300" />
                          <span className="text-sm font-medium">
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}

                {/* Sign-Out Menu */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <SidebarMenuItem key="signout">
                      <SidebarMenuButton className="flex items-center p-5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light">
                        <LogOut className="h-5 w-5" />
                        <span className="text-sm font-medium">Sign-Out</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Sign Out</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to sign out? You will need to log
                        in again to access your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={() => signOut()}>
                        Sign Out
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="dark:bg-gray-900">
          <div className="hidden lg:flex flex-col">{/* <ThemeToggle /> */}</div>
        </SidebarFooter>
        <SidebarRail className="border-none" />
      </Sidebar>
    );
  }

  