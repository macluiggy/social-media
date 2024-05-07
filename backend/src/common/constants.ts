const API_VERSION = 'v1';
const OBJECT = {
  a: 1,
};
const NODE_ENVIRONMENTS = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  TEST: 'test',
};

function sealAndFreezeObj(...objs) {
  // return Object.freeze(Object.seal(Object.assign({}, ...objs)));
  for (const obj of objs) {
    Object.seal(obj);
    Object.freeze(obj);
  }
}

sealAndFreezeObj(OBJECT, API_VERSION, NODE_ENVIRONMENTS);

export { API_VERSION, OBJECT, NODE_ENVIRONMENTS };
