import { Middleware } from 'redux';

const actionToPlainObject: Middleware = () => next => action => {
  next({ ...action });
};

export default actionToPlainObject;
