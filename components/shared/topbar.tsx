import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";

function Topbar() {
  return (
    <nav className="fixed md:hidden top-0 z-30 flex w-full items-center justify-between border-b shadow-lg px-5 py-2 bg-background">
      <Link href="/">
        <h1 className="font-bold text-xl">
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

        <div className="flex-shrink-0 pr-5">
          <SignedIn>
            <SignOutButton>
              <Image
                src="/logout.svg"
                alt="logout"
                width={24}
                height={24}
                className="invert dark:invert-0"
              />
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
