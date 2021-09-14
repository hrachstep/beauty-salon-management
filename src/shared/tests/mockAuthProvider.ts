import { container } from 'tsyringe';

import { Auth } from '@domain/modules/users/entities/Auth';
import { User } from '@domain/modules/users/entities/User';
import { IAuthProvider } from '@domain/modules/users/interfaces/IAuthProvider';

class MockAuthProvider implements IAuthProvider {
  async verify(payload: Auth): Promise<User> {
    return {
      email: 'fake-email@email.com',
      name: 'fake-name',
      id: 'fake-id',
    };
  }
}

export const mockAuthProvider = () => {
  container.registerSingleton<IAuthProvider>('AuthProvider', MockAuthProvider);
};
