import { PosDto } from "../dto/post-dto";
import { Post } from "../generated/prisma/client";
import { PostRepository } from "../repository/post.repository";

export class PostService {
  static async getAll(type: string, limit: number): Promise<PosDto[]> {
    let posts: Post[] = await PostRepository.getAll(type);

    if (limit > 0) {
      posts = await PostRepository.getAllWithLimit(type, limit);
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
