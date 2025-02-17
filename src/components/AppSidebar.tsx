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
  
  const items = [
    { title: "Profile", url: "/profile", icon: User ,public:true},
    { title: "Announcement", url: "/announcement", icon: Volume2 ,public:true},
    { title: "Tickets", url: "/tickets", icon: HandCoins ,public:true},
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

    // const isAdmin = session?.user?.Admin ?? false;
     //   const isDisabled =
                //     (!item.public && !isConfigAvailable) || 
                //     (!isPaid && !item.public) || 
                //     (item.title === "Plans" && !isConfigAvailable);
                const isDisabled =false
  
    function signOut(): void {
      // Remove user data from localStorage
      localStorage.removeItem('user');
    
      // Clear the login cookie
      document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    
      // Optionally, redirect the user to the login page
      window.location.href = '/login';
    }

    return (
      <Sidebar className="dark:bg-gray-900" variant="sidebar" collapsible="icon">
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
  
                {/* Dynamic Menu Items */}
                {items.map((item) => {
                  const isActive = `/${pathSegments[0]}` === item.url;
                //   const isDisabled =
                //     (!item.public && !isConfigAvailable) || 
                //     (!isPaid && !item.public) || 
                //     (item.title === "Plans" && !isConfigAvailable);
  
                  // Render Admin Items
                //   if (isAdmin && item.admin) {
                //     return (
                //       <SidebarMenuItem key={item.title}>
                //         <SidebarMenuButton asChild>
                //           <a
                //             href={item.url}
                //             className={`flex items-center p-5 rounded-md ${
                //               isActive
                //                 ? "bg-muted dark:bg-gray-700 text-primary"
                //                 : "hover:bg-gray-200 dark:hover:bg-gray-700"
                //             }`}
                //           >
                //             <item.icon className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-300" />
                //             <span className="text-sm font-medium">{item.title}</span>
                //           </a>
                //         </SidebarMenuButton>
                //       </SidebarMenuItem>
                //     );
                //   }
  
                  // Render Non-Admin Items
                //   if (!isAdmin && !item.admin) {
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
                            <span className="text-sm font-medium">{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                //   }
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
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Sign Out</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to sign out? You will need to log in
                        again to access your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => signOut()}>Sign Out</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="dark:bg-gray-900">
          <div className="hidden lg:flex flex-col">
            {/* <ThemeToggle /> */}
          </div>
        </SidebarFooter>
        <SidebarRail className="border-none" />
      </Sidebar>
    );
  }
  