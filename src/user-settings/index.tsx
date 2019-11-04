import React, { useState, useEffect, Dispatch } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik, FormikProps } from 'formik';
import styles from './styles.module.scss';
import UploadProfilePicture from './upload-profile-picture/upload-profile-picture';
import accountApi from './api/api';
import { FormValues, initialFormValues, FormSchema } from './types';
import Update from './form/button/update';
import Nickname from './form/field/nickname';
import Phone from './form/field/phone';
import Cancel from './form/button/cancel';
import Helmet from 'react-helmet';
import { RootState } from '../core/state';
import phoneNumberService from '../common/util/phoneNumberService';
import { UpdateProfile } from '../core/profile/state/actions';
import { AxiosError } from 'axios';
import UpdateProfileRequest from './api/types';

const UserSettings = () => {
  const [profilePictureSrc, setProfilePictureSrc] = useState('');
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
  const onSubmit = (form: FormValues, setFieldError: (field: string, message: string) => void) => {
    const phoneNumber = phoneNumberService.appendCountryCode(form.phoneNumber);
    const profileRequest: UpdateProfileRequest = {
      nickname: form.nickname,
      phoneNumber: phoneNumber,
      avatar: profilePictureSrc,
    };
    accountApi
      .update(profileRequest)
      .then(() => {
        dispatchUpdateProfile(new UpdateProfile());
        history.push('/overview');
      })
      .catch((error: AxiosError) => {
        if (error.response !== undefined) {
          if (error.response.status === 409) {
            setFieldError('nickname', 'That nickname already exists');
          }
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>User Settings</title>
      </Helmet>
      <section className={`hero ${styles.gradient}`}>
        <div className={styles['hero-body']}>
          <UploadProfilePicture setProfilePictureSrc={setProfilePictureSrc} />
        </div>
      </section>

      <section className="section">
        <Formik
          validationSchema={FormSchema}
          initialValues={formValues}
          enableReinitialize={true}
          onSubmit={(values, { setFieldError }) => {
            onSubmit(values, setFieldError);
          }}
          render={({ errors, touched, isSubmitting }: FormikProps<FormValues>) => (
            <Form className="container">
              <Nickname hasErrors={!!(touched.nickname && errors.nickname)} />
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
