"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Image as ImageIcon, XCircleIcon } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PostSchema } from "@/lib/schemas/post";
import { createPost } from "@/lib/actions/post";
import { Input } from "../ui/input";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";

interface Props {
  userId: string;
  userImg: string;
}

export const PostInput = ({ userId, userImg }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[]>([]);

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      post: "",
      accountId: userId,
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

  const onSubmit = async (values: z.infer<typeof PostSchema>) => {
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

    console.log("Values before createPost:", values);

    await createPost({
      text: values.post,
      postImage: values.postImage ? values.postImage : "",
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    toast.success("Post Created!");
    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10 bg-[#101012] rounded-lg"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className="flex w-full items-start py-2 px-4">
              <FormLabel className="mt-2">
                <Image
                  src={userImg}
                  alt="Profile Photo"
                  height={36}
                  width={36}
                  className="rounded-full"
                />
              </FormLabel>
              <FormControl className="no-focus bg-transparent border-none px-4 placeholder:text-gray-500">
                <Textarea
                  rows={10}
                  {...field}
                  placeholder="What's happening?"
                  className=""
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-end justify-between px-4 py-2">
          <div>
            <FormField
              control={form.control}
              name="postImage"
              render={({ field }) => (
                <FormItem className="flex gap-4">
                  <div className="flex flex-col">
                    {field.value && (
                      <div className="relative">
                        <Image
                          src={field.value}
                          alt="profile_icon"
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
                    <FormLabel>
                      <ImageIcon className="cursor-pointer hover:bg-primary/40 rounded-full h-8 w-8 p-1 flex-shrink-0" />
                    </FormLabel>
                  </div>
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
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="bg-primary">
            Post
          </Button>
        </div>
      </form>
    </Form>
  );
};
