import * as z from "zod";

export const PostSchema = z.object({
  post: z.string().min(2, { message: "Minimum 2 characters." }),
  accountId: z.string(),
  postImage: z.string().url().optional(),
});

export const CommentSchema = z.object({
  post: z.string().min(2, { message: "Minimum 2 characters." }),
  postImage: z.string().url().optional(),
});
