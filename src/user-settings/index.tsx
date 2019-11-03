import React, { FC, useState, useEffect, Dispatch } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import styles from './styles.module.scss';
import UploadProfilePicture from './upload-profile-picture/upload-profile-picture';
import accountApi from './api';
import UpdateProfileRequest from './types';
import Update from './form/button/update';
import Nickname from './form/field/nickname';
import Phone from './form/field/phone';
import Cancel from './form/button/cancel';
import { useHistory } from 'react-router';
import Helmet from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../core/state';
import phoneNumberService from '../common/utils/phoneNumberService';
import { UpdateProfile } from '../core/profile/state/actions';

const initialFormValues = {
  phoneNumber: '',
  nickname: '',
};

type FormValues = typeof initialFormValues;

const FormSchema = Yup.object().shape<FormValues>({
  phoneNumber: Yup.string()
    .matches(phoneNumberService.getRegExp(), 'Phone number is not valid')
    .min(8, 'Phone number is too short')
    .max(10, 'Phone number is too long')
    .required('Required'),
  nickname: Yup.string()
    .min(3, 'Nickname is too short')
    .max(50, 'Nickname is too long')
    .required('Required'),
});

type Props = {
  initialProfilePictureText: string;
  initialProfilePictureSrc: string;
};

const UserSettings: FC<Props> = (props: Props) => {
  const [profilePictureText, setProfilePictureText] = useState(props.initialProfilePictureText);
  const [profilePictureSrc, setProfilePictureSrc] = useState(props.initialProfilePictureText);
  const initialNickname = useSelector((state: RootState) => state.profile.nickname);
  const initialPhoneNumber = useSelector((state: RootState) => state.profile.phoneNumber);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const dispatchUpdateProfile = useDispatch<Dispatch<UpdateProfile>>();

  useEffect(() => {
    const initialFormValues = {
      nickname: initialNickname,
      phoneNumber: initialPhoneNumber,
    };

    if (initialPhoneNumber !== undefined) {
      initialFormValues.phoneNumber = phoneNumberService.removeCountryCode(initialPhoneNumber);
    }

    setFormValues(initialFormValues);
  }, [initialNickname, initialPhoneNumber]);

  const history = useHistory();

  const onSubmit = (form: FormValues) => {
    const phoneNumber = phoneNumberService.appendCountryCode(form.phoneNumber);
    const profileRequest: UpdateProfileRequest = {
      nickname: form.nickname,
      phoneNumber: phoneNumber,
      avatar: profilePictureSrc,
    };
    accountApi.update(profileRequest).then(() => {
      dispatchUpdateProfile(new UpdateProfile());
    });
    history.push('/overview');
  };

  return (
    <>
      <Helmet>
        <title>User Settings</title>
      </Helmet>
      <section className={`hero ${styles.gradient}`}>
        <div className={styles['hero-body']}>
          <UploadProfilePicture
            profilePictureText={profilePictureText}
            setProfilePictureSrc={setProfilePictureSrc}
          />
        </div>
      </section>

      <section className="section">
        <Formik
          validationSchema={FormSchema}
          initialValues={formValues!}
          enableReinitialize={true}
          onSubmit={onSubmit}
          render={({ errors, touched, isSubmitting, handleBlur }: FormikProps<FormValues>) => (
            <Form className="container">
              <Nickname
                hasErrors={!!(touched.nickname && errors.nickname)}
                setProfilePictureText={setProfilePictureText}
                handleBlur={handleBlur}
              />
              <Phone hasErrors={!!(touched.phoneNumber && errors.phoneNumber)} />

              <footer className={`footer has-background-white center`}>
                <div className={`field is-flex is-full-width ${styles.bottom} ${styles.between}`}>
                  <Update isSubmitting={isSubmitting} />
                  <Cancel isSubmitting={isSubmitting} />
                </div>
              </footer>
            </Form>
          )}
        />
      </section>
    </>
  );
};

export default UserSettings;
