"use client";

import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image as ImageIcon, XCircleIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CommentSchema } from "@/lib/schemas/post";
import { addCommentToPost } from "@/lib/actions/post";
import { useUploadThing } from "@/lib/uploadthing";
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

interface Props {
  postId: string;
  currentUserImg: string;
  currentUserId: string;
}

export const Comment = ({ postId, currentUserImg, currentUserId }: Props) => {
  const pathname = usePathname();
  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      post: "",
      postImage: undefined,
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof CommentSchema>) => {
    const blob = values.postImage;

    console.log("Submitting post with values:", values);

    if (blob) {
      const hasImageChanged = isBase64Image(blob);
      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes && imgRes[0].url) {
          values.postImage = imgRes[0].url;
        }
      }
    }

    await addCommentToPost(
      postId,
      values.post,
      values.postImage || "",
      JSON.parse(currentUserId),
      pathname
    );

    form.reset();
  };

  return (
    <Form {...form}>
      <form className="flex items-start" onSubmit={form.handleSubmit(onSubmit)}>
        <Image
          src={currentUserImg}
          alt="current_user"
          width={48}
          height={48}
          className="rounded-full object-cover"
        />

        <div className="flex items-start w-full">
          <div className="flex flex-col w-full gap-4">
            <FormField
              control={form.control}
              name="post"
              render={({ field }) => (
                <FormItem className="flex w-full items-center gap-3 relative">
                  <FormControl className="border-none bg-transparent">
                    <Input
                      type="text"
                      {...field}
                      placeholder="Comment..."
                      className="no-focus"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postImage"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <div className="">
                    <FormLabel>
                      <ImageIcon className="cursor-pointer hover:bg-primary/40 rounded-full h-8 w-8 p-1 flex-shrink-0" />
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          handleImage(e, field.onChange);
                        }}
                      />
                    </FormControl>
                  </div>
                  {field.value && (
                    <div className="relative w-fit">
                      <Image
                        src={field.value}
                        alt="Post Image"
                        width={200}
                        height={200}
                        priority
                        className="rounded-lg object-contain"
                      />
                      <XCircleIcon
                        className="cursor-pointer absolute top-2 right-2 hover:bg-black/20 rounded-full"
                        onClick={() => {
                          form.setValue("postImage", undefined);
                        }}
                      />
                    </div>
                  )}
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="">
            Reply
          </Button>
        </div>
      </form>
    </Form>
  );
};
