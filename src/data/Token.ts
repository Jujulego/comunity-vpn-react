import Document from 'data/Document';

// Interface
interface Token extends Document {
  // Attributes
  from: string,
  createdAt: string
}

export default Token;