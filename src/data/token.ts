import Document from './document';

// Interface
interface Token extends Document {
  // Attributes
  from: string,
  createdAt: string
}

export default Token;