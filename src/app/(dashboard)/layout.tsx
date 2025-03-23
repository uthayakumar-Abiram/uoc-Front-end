"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, Contact, Menu, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
// import Cookies from "js-cookie";


export default  function Layout({ children }: { children: React.ReactNode }) {
  
//   const defaultOpen = Cookies.get("sidebar:state") === "true";
 
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

const pathSegments =
  pathname === "/" ? [""] : pathname.split("/").filter(Boolean);
  
   const router = useRouter();

    //  if (status === "loading") {
    //    return (
    //      <div className="flex items-center justify-center h-screen">
    //        <Spinner />
    //      </div>
    //    );
    //  }

  useEffect(()=>{
const user = JSON.parse(localStorage.getItem("user") || "{}");
if (!user?._id) {
  router.push("/login");
  return;
}
  },[router])
  

    const showSidebar = pathname !== "/";
    if (!showSidebar ) {
      return <>{children}</>;
    }

    // if (status === "unauthenticated") {
    //   return router.push("/");
    // }
    
    // // Check if AppConfig is unavailable
    // if (!session?.user?.AppConfig && pathname !== "/account") {
    //   if (!session?.user?.Admin) {
    //     // Redirect non-admin users to the home page
    //     return router.push("/");
    //   } else if (session?.user?.Admin && !pathname.startsWith("/admin")) {
    //     // Redirect admin users to the admin dashboard if not on an admin route
    //     return router.push("/admin/dashboard");
    //   }
    // } else if (!session?.user?.Admin && pathname.startsWith("/admin")) {
    //   // Redirect non-admin users attempting to access admin routes
    //   return router.push("/");
    // }
    
    // // Restrict access for unpaid users
    // if (session?.user?.isPaid === false && !session?.user?.Admin) {
    //   if (pathname !== "/account" && pathname !== "/plans") {
    //     // Allow unpaid users to access only the account page and the plans page
    //     return router.push("/plans");
    //   }
    // }
   
   


  return (
    <div className="grid  w-full">
      <SidebarProvider 
    //   defaultOpen={defaultOpen}
      >
        <AppSidebar pathSegments={pathSegments} />

        <div className="flex flex-col w-full h-[100%]">
          <div className="flex flex-col lg:hidden items-center">
            <div className="flex justify-between w-full items-center px-4 py-2">
              <SidebarTrigger />

              <div className="flex items-center space-x-4">
                {/* Drawer for mobile navigation */}
                {/* <Drawer open={isOpen} onOpenChange={setIsOpen}>
                  <DrawerTrigger asChild>
                    <Button
                      disabled={!session?.user?.AppConfig}
                      variant="ghost"
                      onClick={() => setIsOpen(true)}
                    >
                      <Contact />
                      <span className="sr-only">Contacts</span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="max-h-[80vh]">
                    <DrawerHeader>
                      <div className="flex items-center justify-center">
                        <div className="flex-1 ml-14">
                          <DrawerTitle>Chat</DrawerTitle>
                          <DrawerDescription>
                            Choose chat here
                          </DrawerDescription>
                        </div>
                        <div className="flex justify-end items-end">
                          <Button
                            variant="outline"
                            className=" justify-end"
                            onClick={() => setIsOpen(false)}
                          >
                            <X />
                            <span className="sr-only">Contacts</span>
                          </Button>
                        </div>
                      </div>
                    </DrawerHeader>

                    {pathname.startsWith("/conversation") ? (
                      <ChatNav />
                    ) : (
                      <GroupLayout />
                    )}
                  </DrawerContent>
                </Drawer> */}

                {/* <ThemeToggle /> */}

                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-[1.2rem] w-[1.2rem] dark:text-white" />
                      <span className="sr-only">Settings</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                   
                    <DropdownMenuItem onClick={() => signOut()}>
                      Sign-out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
              </div>
            </div>
          </div>

          {/* Desktop Navigation with Breadcrumb */}
          <div className="my-3 hidden lg:flex items-center justify-between  pl-3 py-1 ">
            <div className="flex items-center">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className="bg-black dark:bg-white rounded-2xl font-bold  h-5 mx-3"
              />

              {/* Breadcrumb navigation */}
              <nav className="flex items-center space-x-2 text-md font-semibold text-gray-600">
                <Link
                  href="/account"
                  className="hover:text-black  dark:hover:text-gray-200  "
                >
                Account
                </Link>
                <ChevronRight className="mx-1" />
                {pathSegments.map((segment, index) => {
                  const isLast = index === pathSegments.length - 1;
                  const href = "/" + pathSegments.slice(0, index + 1).join("/");

                  return (
                    <span key={href} className="flex items-center">
                      {isLast &&
                      segment !== "addContact" &&
                      segment !== "EditTemplate" &&
                      segment !== "ViewTemplate" ? (
                        <span>{segment}</span>
                      ) : segment !== "addContact" &&
                        segment !== "EditTemplate" &&
                        segment !== "ViewTemplate" ? (
                        <>
                          <Link
                            href={href}
                            className="hover:text-black dark:hover:text-gray-200  "
                          >
                            {segment}
                          </Link>
                          <ChevronRight className="mx-1" />
                        </>
                      ) : null}
                    </span>
                  );
                })}
              </nav>
            </div>

            {/* Right-side options (e.g., ThemeToggle) */}
            <div className="flex lg:hidden items-center space-x-4">
              {/* <ThemeToggle /> */}
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1  overflow-auto">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
