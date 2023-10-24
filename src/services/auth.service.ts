import { UserEntity } from '../entities/user.entity.ts';
import { UserRepository } from '../data-access/user.repository.ts';
import { CustomError } from '../utils/custom-error.ts';
import { INVALID_CREDENTIALS, USER_ALREADY_EXIST } from '../utils/constants.ts';
import { StatusCodes } from 'http-status-codes';
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export class AuthService {
  static async authenticateUser(user: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    const oldUser: UserEntity | null = await UserRepository.getUserByEmail(user.email);

    if (oldUser) {
      throw new CustomError(USER_ALREADY_EXIST, StatusCodes.CONFLICT);
    }

    const encryptedPassword: string = await bcrypt.hash(user.password, 10);

    return UserRepository.createUser({
      email: user.email.toLowerCase(),
      password: encryptedPassword,
      role: user.role,
    });
  }

  static async authorizeUser(email: string, password: string): Promise<string> {
    const user: UserEntity | null = await UserRepository.getUserByEmail(email);
    const passwordIsValid = await bcrypt.compare(password, user!.password);

    if (!user && !passwordIsValid) {
      throw new CustomError(INVALID_CREDENTIALS, StatusCodes.BAD_REQUEST);
    }

    const token: string = jwt.sign(
      { user_id: user!.id, email, role: user!.role },
      process.env.TOKEN_KEY!,
      {
        expiresIn: "2h",
      }
    );

    return token;
  }
}
