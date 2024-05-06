import Lang, { BasicCrud } from './lang.type';

function getGenericCrudMessagesEN(entity: string): BasicCrud {
  return {
    UPDATED: `${entity} updated successfully`,
    ALREADY_EXISTS: `${entity} already exists`,
    CREATED: `${entity} created successfully`,
    NOT_FOUND: `${entity} not found`,
  };
}

const EN: Lang = {
  USER: {
    ...getGenericCrudMessagesEN('User'),
  },
  POST: {
    ...getGenericCrudMessagesEN('Post'),
  },
};

export default EN;
