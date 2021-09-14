import 'dotenv/config';
import { OAuthCredential, signInWithCredential } from 'firebase/auth';

import { Auth } from '@domain/modules/users/entities/Auth';
import { User } from '@domain/modules/users/entities/User';
import { IAuthProvider } from '@domain/modules/users/interfaces/IAuthProvider';
import { Firebase } from '@infrastructure/shared/Firebase';

export class FirebaseAuthProvider implements IAuthProvider {
  async verify({
    providerId,
    signInMethod,
    token,
  }: Auth): Promise<User> {
    const { auth } = Firebase;

    const credential = OAuthCredential.fromJSON({
      providerId,
      signInMethod,
      accessToken: token,
    });

    try {
      const result = await signInWithCredential(auth, credential);

      return {
        email: result.user.email,
        name: result.user.displayName,
        id: result.user.uid,
      };
    } catch (e) {
      return null;
    }
  }
}
