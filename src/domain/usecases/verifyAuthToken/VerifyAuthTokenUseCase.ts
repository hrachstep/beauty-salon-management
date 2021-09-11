import { inject, injectable } from 'tsyringe';

import { Auth } from '@domain/entities/Auth';
import { User } from '@domain/entities/User';
import { IAuthProvider } from '@domain/interfaces/IAuthProvider';
import { ApiError } from '@shared/errors/ApiError';

@injectable()
export class VerifyAuthTokenUseCase {
  constructor(
    @inject('AuthProvider')
    private readonly authProvider: IAuthProvider,
  ) {}

  async execute({ token, signInMethod, providerId }: Auth): Promise<User> {
    const user = await this.authProvider.verify({
      token,
      signInMethod,
      providerId,
    });

    if (!user) {
      throw new ApiError('Token is invalid!', 401);
    }

    return user;
  }
}
