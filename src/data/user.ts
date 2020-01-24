import Token from 'data/token';

// Interface
interface User {
  // Attributes
  readonly _id: string,
  email: string,
  admin: boolean,
  tokens: Token[]
}

export default User;