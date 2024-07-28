"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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
import { sidebarLinks } from "@/constants";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r py-5 max-md:hidden gap-6">
      <Link href="/">
        <h1 className="font-bold text-3xl px-6">
          <span className="text-primary">C</span>ampus{" "}
          <span className="text-primary">C</span>onnect
        </h1>
      </Link>

      <div className="flex w-full flex-1 flex-col gap-4 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex justify-start gap-4 rounded-lg p-4 ${
                isActive
                  ? "bg-primary hover:bg-primary/80 transition-colors"
                  : "hover:bg-[#1F1F22] transition-colors"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className="max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <OrganizationSwitcher
            appearance={{
              baseTheme: dark,
              elements: {
                organizationSwitcherTrigger: "p-4",
              },
            }}
          />

          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer gap-4 p-4 hover:bg-[#1F1F22] transition-colors rounded-lg">
                  <Menu className="h-6 w-6" />
                  <p className="max-lg:hidden">More</p>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[250px]">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <div className="flex gap-4 cursor-pointer p-2 rounded-lg w-full">
                      <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

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
                      <Image
                        src="/logout.svg"
                        alt="logout"
                        width={24}
                        height={24}
                      />

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
                    <AlertDialogAction>Logout</AlertDialogAction>
                  </SignOutButton>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogPortal>
          </AlertDialog>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
