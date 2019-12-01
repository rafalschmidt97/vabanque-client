import { ProfileActionTypes } from './../../core/profile/state/actions';
import { ProfileState } from '../../core/profile/state/types';
import { SetProfile } from '../../core/profile/state/actions';
import { store } from '../../app';
import { Middleware } from 'redux';
import { AuthActionTypes } from '../../core/auth/state/actions';
import accountApi from '../../settings/update-profile-form/api/api';

const updateProfile: Middleware = () => next => action => {
  if (action.type === AuthActionTypes.Login || action.type === ProfileActionTypes.UpdateProfile) {
    accountApi.get().then(profile => {
      const profileState: ProfileState = {
        id: profile.id,
        email: profile.email,
        nickname: profile.nickname,
        phoneNumber: profile.phoneNumber,
        avatar: profile.avatar,
      };
      store.dispatch(new SetProfile(profileState));
    });
  }
  next({ ...action });
};

export default updateProfile;
