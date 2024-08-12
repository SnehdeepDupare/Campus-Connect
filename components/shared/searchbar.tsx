"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";

interface Props {
  routeType: string;
}

export const Searchbar = ({ routeType }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?q=` + search);
      } else {
        router.push(`/${routeType}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType, router]);

  return (
    <div className="flex gap-1 rounded-lg bg-secondary px-4 py-2">
      <Image
        src="/search.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain invert dark:invert-0"
      />
      <Input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${
          routeType !== "search" ? "Search communities" : "Search people"
        }`}
        className="no-focus border-none bg-transparent outline-none"
      />
    </div>
  );
};
