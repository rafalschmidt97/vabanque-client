import React, { FC } from 'react';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/state';

const props = {
  profilePictureSrc: '',
  size: '20',
};

type Props = typeof props;

const ProfilePicture: FC<Props> = defaultProps => {
  const nickname = useSelector((state: RootState) => state.profile.nickname);

  return (
    <Avatar
      name={nickname}
      round={true}
      size={defaultProps.size}
      src={defaultProps.profilePictureSrc}
    />
  );
};

export default ProfilePicture;
