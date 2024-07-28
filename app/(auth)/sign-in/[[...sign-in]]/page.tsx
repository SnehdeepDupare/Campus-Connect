import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="hidden lg:block relative h-screen">
        <Image
          src="/testimg.avif"
          alt="Image"
          fill
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
}
