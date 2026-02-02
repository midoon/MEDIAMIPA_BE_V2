import { Hono } from "hono";
import { PostService } from "../service/post.service";
import { DataResponse } from "../dto/response";
import { PosDto } from "../dto/post-dto";

export const PostController = new Hono();

PostController.get("/api/posts", async (c) => {
  const type = c.req.query("type") || "all";
  const limit = parseInt(c.req.query("limit") || "0", 10);
  const posts: PosDto[] = await PostService.getAll(type, limit);

  const res: DataResponse<PosDto[]> = {
    status: true,
    message: "Posts fetched successfully",
    data: posts,
  };
  return c.json(res);
});

PostController.get("/api/posts/:postId", async (c) => {
  const postId = c.req.param("postId");
  const post: PosDto | null = await PostService.getById(postId);
  if (!post) {
    return c.json({
      status: false,
      message: "Post not found",
      data: null,
    });
  }
  const res: DataResponse<PosDto> = {
    status: true,
    message: "Post fetched successfully",
    data: post,
  };
  return c.json(res);
});
