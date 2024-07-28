"use client";

import { LinkIcon, Share2 } from "lucide-react";
import Image from "next/image";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const ShareButton = ({ postId }: { postId: string }) => {
  const shareUrl = `https://campus-connect-cc.vercel.app/post/${postId}`;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full" size="icon">
            <Share2 className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex items-center gap-x-4 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              toast.info("Link Copied to clipboard");
            }}
          >
            <LinkIcon className="h-5 w-5" />
            Copy Link
          </DropdownMenuItem>

          <DialogTrigger asChild className="w-full">
            <DropdownMenuItem className="flex items-center gap-x-4 cursor-pointer">
              <Share2 className="h-5 w-5" />
              Share via
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-center gap-4">
            <WhatsappShareButton url={shareUrl} blankTarget>
              <WhatsappIcon round size={50} />
            </WhatsappShareButton>

            <FacebookShareButton url={shareUrl} blankTarget>
              <FacebookIcon round size={50} />
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl} blankTarget>
              <TwitterIcon round size={50} />
            </TwitterShareButton>

            <LinkedinShareButton url={shareUrl} blankTarget>
              <LinkedinIcon round size={50} />
            </LinkedinShareButton>

            <TelegramShareButton url={shareUrl} blankTarget>
              <TelegramIcon round size={50} />
            </TelegramShareButton>
          </div>

          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
