import hashPassword from "@/auth/pass-hash";
import { connection } from "@/database";
import { TUser } from "shimps";

export default class UsersService {
  constructor() {}

  public async createUser(name: string, email: string, password: string) {
    const hashedPassword = await hashPassword(password);
    const user = await connection.query(
      `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [name, email, hashedPassword]
    );

    delete user.rows[0].password;
    return user.rows[0];
  }

  public async getUsers() {
    const users = await connection.query(`
      SELECT * FROM users
    `);

    return users.rows;
  }

  public async getUserByName(name: string) {
    const user = await connection.query(
      `
      SELECT * FROM users
      WHERE username = $1
    `,
      [name]
    );

    return user.rows[0];
  }

  public async getUserById(id: number) {
    const user = await connection.query(
      `
      SELECT * FROM users
      WHERE id = $1
    `,
      [id]
    );

    return user.rows[0];
  }

  public async getUserByEmail(email: string): Promise<TUser> {
    const user = await connection.query(
      `
      SELECT * FROM users
      WHERE email = $1
    `,
      [email]
    );

    return user.rows[0];
  }
}
