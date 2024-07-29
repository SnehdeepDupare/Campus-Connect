import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { OnboardingForm } from "../auth/onboarding-form";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

export const UpdateProfile = async () => {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center gap-3 rounded-lg bg-[#101012] px-4 py-2">
          <Pencil className="h-4 w-4" />

          <p className="text-[#efefef] max-sm:hidden">Edit</p>
        </div>
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl max-h-[80vh] md:max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <OnboardingForm user={userData} />
      </DialogContent>
    </Dialog>
  );
};
