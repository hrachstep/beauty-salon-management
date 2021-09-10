import { Auth } from '@domain/entities/Auth';
import { User } from '@domain/entities/User';

export interface IAuthProvider {
  verify(payload: Auth): Promise<User>;
}
