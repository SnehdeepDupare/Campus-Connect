"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

export const UserCard = ({ id, name, username, imgUrl, personType }: Props) => {
  const router = useRouter();

  const isCommunity = personType === "Community";

  return (
    <article className="flex justify-between gap-4 max-xs:rounded-xl max-xs:bg-dark-3 max-xs:p-4 xs:flex-row xs:items-center">
      <div className="flex flex-1 items-start justify-start gap-3 xs:items-center">
        <div className="relative h-12 w-12">
          <Image
            src={imgUrl}
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-[#697C89]">@{username}</p>
        </div>
      </div>

      <Button
        className="rounded-lg bg-primary text-[12px] text-black dark:text-white"
        onClick={() => {
          if (isCommunity) {
            router.push(`/communities/${id}`);
          } else {
            router.push(`/profile/${id}`);
          }
        }}
      >
        View
      </Button>
    </article>
  );
};
