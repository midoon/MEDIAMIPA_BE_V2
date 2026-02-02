import { z, ZodType } from "zod";

export class PostValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().optional(),
    type: z.string().min(1, "Type is required"),
  });
}
