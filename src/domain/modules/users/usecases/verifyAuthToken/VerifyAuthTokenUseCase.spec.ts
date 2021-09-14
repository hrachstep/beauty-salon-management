import { IAuthProvider } from '@domain/modules/services/interfaces/IAuthProvider';
import { ApiError } from '@shared/errors/ApiError';

import { VerifyAuthTokenUseCase } from './VerifyAuthTokenUseCase';

describe('Verify Auth Token usecase', () => {
  const repository: IAuthProvider = {
    verify: jest.fn(() => Promise.resolve({
      id: 'test-id',
      email: 'test@email.com',
      name: 'test',
    })),
  };

  const payload = {
    token: 'teste',
    signInMethod: 'teste.com',
    providerId: 'teste.com',
  };

  let usecase: VerifyAuthTokenUseCase;

  beforeEach(() => {
    usecase = new VerifyAuthTokenUseCase(repository);
  });

  it('should call auth provider with payload passed', async () => {
    await usecase.execute(payload);
    expect(repository.verify).toHaveBeenCalledWith(payload);
  });

  it('should return an error when token is invalid', async () => {
    const customRepository = {
      verify: jest.fn(() => Promise.resolve(null)),
    };

    expect(async () => {
      usecase = new VerifyAuthTokenUseCase(customRepository);
      await usecase.execute(payload);
    }).rejects.toBeInstanceOf(ApiError);
  });

  it('should return a user when token is valid', async () => {
    const user = await usecase.execute(payload);

    expect(user.id).toBeTruthy();
    expect(user.email).toBeTruthy();
    expect(user.name).toBeTruthy();
  });
});
