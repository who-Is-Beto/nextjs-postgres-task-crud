import hashPassword from "@/auth/pass-hash";
import { prisma } from "@/config";

export default class UsersService {
  constructor() {}

  public async createUser(name: string, email: string, password: string) {
    return prisma.user.create({
      data: {
        username: name,
        email,
        password: await hashPassword(password)
      },
      select: {
        username: true,
        email: true,
        password: false
      }
    });
  }

  public async updateUser(id: number, name: string, email: string) {
    return prisma.user.update({
      where: {
        id
      },
      data: {
        username: name,
        email
      }
    });
  }

  public async deleteUser(id: number) {
    return prisma.user.delete({
      where: {
        id
      }
    });
  }

  public async getUsers() {
    return prisma.user.findMany({
      select: {
        username: true,
        email: true,
        password: false,
        id: true,
        created_at: true,
        tasks: true
      }
    });
  }

  public async getUserByName(name: string) {
    return await prisma.user.findUnique({
      where: {
        username: name
      },
      select: {
        username: true,
        email: true,
        password: false,
        id: true,
        created_at: true,
        tasks: true
      }
    });
  }

  public async getUserById(id: number) {
    return prisma.user.findUnique({
      where: {
        id
      },
      select: {
        username: true,
        email: true,
        password: false,
        id: true,
        created_at: true,
        tasks: true
      }
    });
  }

  public async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email
      },
      select: {
        username: true,
        email: true,
        password: true,
        id: true,
        created_at: true,
        tasks: true
      }
    });
  }
}
