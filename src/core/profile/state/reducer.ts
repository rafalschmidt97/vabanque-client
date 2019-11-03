import { ProfileActions, ProfileActionTypes } from './actions';
import { ProfileState } from './types';
import { Reducer } from 'redux';

const initialState: ProfileState = {
  id: 0,
  email: '',
  nickname: '',
  phoneNumber: '',
  avatar: '',
};

export const ProfileReducer: Reducer<ProfileState, ProfileActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ProfileActionTypes.SetProfile: {
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        nickname: action.payload.nickname,
        phoneNumber: action.payload.phoneNumber,
        avatar: action.payload.avatar,
      };
    }
  }

  return state;
};
