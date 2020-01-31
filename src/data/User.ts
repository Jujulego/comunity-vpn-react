import Document from 'data/Document';
import Token from 'data/Token';

// Interfaces
interface User extends Document {
  // Attributes
  email: string,
  admin: boolean,
  tokens: Token[]
}

export type Credentials = Pick<User, 'email'> & { password: string };

export default User;