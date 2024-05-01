export const API_VERSION = 'v1';
const OBJECT = {
  a: 1,
};

function sealAndFreezeObj(...objs) {
  // return Object.freeze(Object.seal(Object.assign({}, ...objs)));
  for (const obj of objs) {
    Object.seal(obj);
    Object.freeze(obj);
  }
}

sealAndFreezeObj(OBJECT, API_VERSION);

export default {
  API_VERSION,
  OBJECT,
};
