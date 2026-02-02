import { prismaClient } from "../application/database";
import { PostType } from "../generated/prisma/enums";

export class PostRepository {
  static getAll = async (type: string) => {
    const posts = await prismaClient.post.findMany({
      where: {
        type: type as PostType,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return posts;
  };

  static getAllWithLimit = async (type: string, limit: number) => {
    const posts = await prismaClient.post.findMany({
      where: {
        type: type as PostType,
      },
      orderBy: {
        created_at: "desc",
      },
      take: limit,
    });

    return posts;
  };

  static getById = async (id: string) => {
    const post = await prismaClient.post.findUnique({
      where: {
        id,
      },
    });

    return post;
  };
}
