import { PosDto } from "../dto/post-dto";
import { Post, PostType } from "../generated/prisma/client";
import { PostRepository } from "../repository/post.repository";

export class PostService {
  static async getAll(type: string, limit: number): Promise<PosDto[]> {
    const prismaType: PostType = ["news", "achievement"].includes(type)
      ? (type as PostType)
      : "news";
    let posts: Post[];

    if (limit > 0) {
      posts = await PostRepository.getAllWithLimit(prismaType, limit);
    } else {
      posts = await PostRepository.getAll(prismaType);
    }

    const result: PosDto[] = posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      image: post.image,
      type: post.type,
      date: post.created_at,
    }));
    return result;
  }

  static async getById(id: string): Promise<PosDto | null> {
    const post: Post | null = await PostRepository.getById(id);

    if (!post) {
      return null;
    }

    return {
      id: post.id,
      title: post.title,
      description: post.description,
      image: post.image,
      type: post.type,
      date: post.created_at,
    };
  }
}
