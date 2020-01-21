// Interface
interface Server {
  // Attributes
  readonly _id: string,
  ip: string,
  port: number,
  country: string,
  available: boolean,
  user: string
}

export default Server;