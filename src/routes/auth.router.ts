import express, { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.ts';
import { UserEntity } from '../entities/user.entity.ts';
import { StatusCodes } from 'http-status-codes';
import { INPUT_REQUIRED, SOMETHING_WENT_WRONG, USER_REGISTERED } from '../utils/constants.ts';

export const authRouter = express.Router();

authRouter.post("/register", async (req: Request<any, any, Omit<UserEntity, 'id'>>, res: Response): Promise<void> => {
  try {
    const user: Omit<UserEntity, 'id'> = req.body;
    // Validate user input
    if (!(user.email && user.password && user.role)) {
      res.status(StatusCodes.BAD_REQUEST).send(INPUT_REQUIRED);
    }

    await AuthService.authenticateUser(user);

    res.status(StatusCodes.CREATED).send(USER_REGISTERED);
  } catch (e: any) {
    const errorData = {
      data: null,
      error: { message: e.message || SOMETHING_WENT_WRONG }
    };

    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errorData);
  }
});

authRouter.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      res.status(StatusCodes.BAD_REQUEST).send(INPUT_REQUIRED);
    }

    const token = await AuthService.authorizeUser(email, password);

    res.status(StatusCodes.OK).json({ data: { token }, error: null });
  } catch (e: any) {
    const errorData = {
      data: null,
      error: { message: e.message || SOMETHING_WENT_WRONG }
    };

    res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json(errorData);
  }
});
