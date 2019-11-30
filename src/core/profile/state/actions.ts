import { ProfileState } from './types';
import { Action } from 'redux';

export enum ProfileActionTypes {
  SetProfile = '[Profile] Set Profile',
  UpdateProfile = '[Profile] Update Profile',
}

export class UpdateProfile implements Action {
  readonly type = ProfileActionTypes.UpdateProfile;
}

export class SetProfile implements Action {
  readonly type = ProfileActionTypes.SetProfile;
  payload: ProfileState;

  constructor(profile: ProfileState) {
    this.payload = profile;
  }
}

export type ProfileActions = SetProfile | UpdateProfile;
