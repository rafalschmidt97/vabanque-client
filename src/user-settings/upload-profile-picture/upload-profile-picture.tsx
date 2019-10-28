import React, { FC, useRef, useState } from 'react';
import ProfilePicture from '../../common/components/profile-picture';

const props = {
  profilePictureText: '',
};
type Props = typeof props;

const UploadProfilePicture: FC<Props> = (props: Props) => {
  const [profilePictureSrc, setProfilePictureSrc] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const uploadProfilePicture = () => {
    if (fileInput.current != null) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (file: FileList | null) => {
    if (file != null && file[0] != null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePictureSrc(String(reader.result));
      };
      reader.readAsDataURL(file[0]);
    }
  };

  return (
    <>
      <div className="container has-text-centered has-height-150" onClick={uploadProfilePicture}>
        <ProfilePicture
          profilePictureSrc={profilePictureSrc}
          profilePictureText={props.profilePictureText}
          size="150"
        />
        <input
          type="file"
          className="is-invisible-touch"
          accept="image/*"
          ref={fileInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e.target.files)}
        />
      </div>
    </>
  );
};

export default UploadProfilePicture;
