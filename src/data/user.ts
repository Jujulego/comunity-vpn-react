import Document from './document';
import Token from './token';

// Interfaces
interface User extends Document {
  // Attributes
  email: string,
  admin: boolean,
  tokens: Token[]
}

export type Credentials = Pick<User, 'email'> & { password: string };

export default User;