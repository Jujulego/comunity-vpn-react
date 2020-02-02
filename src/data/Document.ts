// Interface
interface Document {
  readonly _id: string
}

export type AnyDocument = Document & any;

export default Document;