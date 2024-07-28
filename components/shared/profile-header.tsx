import Link from "next/link";
import Image from "next/image";
import { Pencil } from "lucide-react";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
}

export const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
}: Props) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left font-bold text-2xl">{name}</h2>
            <p className="font-medium text-gray-400">@{username}</p>
          </div>
        </div>
        {accountId === authUserId && type !== "Community" && (
          <Link href="/profile/edit">
            <div className="flex cursor-pointer items-center gap-3 rounded-lg bg-[#101012] px-4 py-2">
              <Pencil className="h-4 w-4" />

              <p className="text-[#efefef] max-sm:hidden">Edit</p>
            </div>
          </Link>
        )}
      </div>

      <p className="mt-6 max-w-lg text-sm text-[#efefef]">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-[#101012]" />
    </div>
  );
};
