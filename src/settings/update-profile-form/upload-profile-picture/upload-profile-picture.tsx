import React, { FC, useRef, useState } from 'react';
import ProfilePicture from '../../../common/component/profile-picture';
import accountApi from '../api/api';

type Props = {
  setProfilePictureSrc: (result: string) => void;
};

const UploadProfilePicture: FC<Props> = (props: Props) => {
  const [profilePictureSrc, setProfilePictureSrc] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const uploadProfilePicture = () => {
    if (fileInput.current != null) {
      fileInput.current.click();
    }
  };

  function uploadFile(file: FileList, props: Props) {
    const data = new FormData();
    data.append('file', file[0], file[0].name);
    accountApi.uploadProfilePicture(data).then(res => props.setProfilePictureSrc(res.url));
  }

  const handleFileChange = (file: FileList | null) => {
    if (file != null && file[0] != null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePictureSrc(String(reader.result));
      };
      reader.readAsDataURL(file[0]);

      uploadFile(file, props);
    }
  };

  return (
    <>
      <div className="container has-text-centered has-height-150" onClick={uploadProfilePicture}>
        <ProfilePicture profilePictureSrc={profilePictureSrc} size="150" />
        <input
          type="file"
          className="is-invisible-touch is-invisible"
          accept="image/*"
          ref={fileInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e.target.files)}
        />
      </div>
    </>
  );
};

export default UploadProfilePicture;
