export type BasicCrud = {
  UPDATED: string;
  ALREADY_EXISTS: string;
  CREATED: string;
  NOT_FOUND?: string;
};
type Lang = {
  USER: BasicCrud;
  POST: BasicCrud;
};

export default Lang;
