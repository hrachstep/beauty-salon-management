import 'dotenv/config';
import { OAuthCredential, signInWithCredential } from 'firebase/auth';

import { Auth } from '@domain/entities/Auth';
import { User } from '@domain/entities/User';
import { IAuthProvider } from '@domain/interfaces/IAuthProvider';
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
      token,
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
