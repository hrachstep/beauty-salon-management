import { Auth } from '@domain/modules/users/entities/Auth';
import { User } from '@domain/modules/users/entities/User';

export interface IAuthProvider {
  verify(payload: Auth): Promise<User>;
}
