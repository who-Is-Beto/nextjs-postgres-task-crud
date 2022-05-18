import hashPassword from "@/auth/pass-hash";
import { connection } from "@/database";

export default class UsersService {
  constructor() {}

  public async createUser(name: string, email: string, password: string) {
    console.log(name, email, password);
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
}
