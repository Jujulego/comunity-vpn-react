import Document from './document';
import Token from './token';

// Interface
interface User extends Document {
  // Attributes
  email: string,
  admin: boolean,
  tokens: Token[]
}

export default User;