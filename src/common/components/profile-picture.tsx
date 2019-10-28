import React, { FC } from 'react';
import Avatar from 'react-avatar';

const props = {
  profilePictureSrc: '',
  profilePictureText: '',
  size: '20',
};

type Props = typeof props;

const ProfilePicture: FC<Props> = defaultProps => {
  return (
    <Avatar
      name={defaultProps.profilePictureText}
      round={true}
      size={defaultProps.size}
      src={defaultProps.profilePictureSrc}
    />
  );
};

export default ProfilePicture;
