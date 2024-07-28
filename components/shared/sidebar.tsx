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

import { sidebarLinks } from "@/constants";
import { dark } from "@clerk/themes";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

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

          <SignOutButton>
            <div className="flex cursor-pointer gap-4 p-4 hover:bg-[#1F1F22] transition-colors rounded-lg">
              <Image src="/logout.svg" alt="logout" width={24} height={24} />

              <p className="max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
