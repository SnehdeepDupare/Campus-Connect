"use client";

import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { useTheme } from "next-themes";
import { LogOut, Menu, Moon, Sun } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { days_one } from "@/lib/utils";

function Topbar() {
  const { setTheme } = useTheme();
  return (
    <nav className="fixed md:hidden top-0 z-30 flex w-full items-center justify-between border-b shadow-lg py-2 bg-background">
      <Link href="/">
        <h1 className={`font-bold text-xl px-6 ${days_one.className}`}>
          <span className="text-primary">C</span>ampus{" "}
          <span className="text-primary">C</span>onnect
        </h1>
      </Link>

      <div className="flex items-center gap-1">
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "",
              userPreviewTextContainer__personalWorkspace: "text-[#747686]",
              organizationSwitcherTriggerIcon: "text-[#747686]",
            },
          }}
        />

        <div className="">
          <SignedIn>
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex cursor-pointer gap-4 p-2 hover:bg-[#1F1F22] transition-colors rounded-lg">
                    <Menu className="h-5 w-5" />
                    <p className="max-lg:hidden">More</p>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="">
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <div className="flex gap-4 items-center cursor-pointer p-2 rounded-lg w-full">
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

                        <span className="">Apperance</span>
                      </div>
                    </DropdownMenuSubTrigger>

                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem
                          onClick={() => setTheme("light")}
                          className="cursor-pointer"
                        >
                          Light
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setTheme("dark")}
                          className="cursor-pointer"
                        >
                          Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setTheme("system")}
                          className="cursor-pointer"
                        >
                          System
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>

                  <AlertDialogTrigger className="w-full hover:bg-[#1F1F22] transition-colors">
                    <DropdownMenuItem className="flex cursor-pointer p-4 rounded-lg w-full">
                      <div className="flex gap-4">
                        <LogOut className="h-5 w-5" />

                        <p className="">Logout</p>
                      </div>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialogPortal>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to log out?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <SignOutButton>
                      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Logout
                      </AlertDialogAction>
                    </SignOutButton>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogPortal>
            </AlertDialog>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
