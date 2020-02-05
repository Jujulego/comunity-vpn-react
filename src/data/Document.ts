// Interfaces
interface Document {
  readonly _id: string
}

export type AnyDocument = Document & {
  [extra in string | number | symbol]: any;
};

export default Document;