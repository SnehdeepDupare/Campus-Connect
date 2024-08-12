"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface Props {
  pageNumber: number;
  isNext: boolean;
  path: string;
}

export const Pagination = ({ pageNumber, isNext, path }: Props) => {
  const router = useRouter();

  const handleNavigation = (type: string) => {
    let nextPageNumber = pageNumber;

    if (type === "prev") {
      nextPageNumber = Math.max(1, pageNumber - 1);
    } else if (type === "next") {
      nextPageNumber = pageNumber + 1;
    }

    if (nextPageNumber > 1) {
      router.push(`/${path}?page=${nextPageNumber}`);
    } else {
      router.push(`/${path}`);
    }
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="mt-10 flex w-full items-center justify-center gap-5">
      <Button
        onClick={() => handleNavigation("prev")}
        disabled={pageNumber === 1}
        className="!text-sm font-normal text-[#efefef]"
      >
        Prev
      </Button>
      <p className="text-sm font-semibold text-white">{pageNumber}</p>
      <Button
        onClick={() => handleNavigation("next")}
        disabled={!isNext}
        className="!text-sm font-normal text-[#efefef]"
      >
        Next
      </Button>
    </div>
  );
};
