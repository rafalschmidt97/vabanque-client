import { FooterActionTypes } from './../../core/footer-menu/state/actions';
import { Middleware } from 'redux';
import history from '../history';

const footerMenuRedirect: Middleware = () => next => action => {
  switch (action.type) {
    case FooterActionTypes.NavigateGame:
      history.push('/game');
      break;
    case FooterActionTypes.NavigateMoney:
      history.push('/money');
      break;
    case FooterActionTypes.NavigateSettings:
      history.push('/settings');
      break;
    default:
      break;
  }
  next({ ...action });
};

export default footerMenuRedirect;
