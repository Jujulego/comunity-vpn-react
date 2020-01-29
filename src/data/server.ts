import Document from './document';

// Interface
interface Server extends Document {
  // Attributes
  ip: string,
  port: number,
  country: string,
  user: string
}

export default Server;