import React, { FC, useState, Dispatch } from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import UploadProfilePicture from './upload-profile-picture/upload-profile-picture';
import Error from '../common/components/error';
import 'react-phone-input-2/dist/style.css';
import accountApi from './api';
import UpdateProfileRequest from './types';
import { useDispatch } from 'react-redux';
import { Logout } from '../core/auth/actions';

const props = {
  initialProfilePictureText: '',
  initialProfilePictureSrc: '',
};

type Props = RouteComponentProps & typeof props;

const initialFormValues = {
  phoneNumber: '',
  nickname: '',
};

type FormValues = typeof initialFormValues;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const FormSchema = Yup.object().shape<FormValues>({
  phoneNumber: Yup.string()
    .min(8, 'Phone number is too short')
    .max(10, 'Phone number is too long')
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required'),
  nickname: Yup.string()
    .min(3, 'Nickname is too short')
    .max(50, 'Nickname is too long')
    .required('Required'),
});

const UserSettings: FC<Props> = props => {
  const dispatchLogout = useDispatch<Dispatch<Logout>>();
  const [profilePictureText, setProfilePictureText] = useState(props.initialProfilePictureText);
  const [profilePictureSrc, setProfilePictureSrc] = useState(props.initialProfilePictureText);

  const onSubmit = (form: FormValues) => {
    const phoneNumber = '+358' + form.phoneNumber;
    const profileRequest: UpdateProfileRequest = {
      nickname: form.nickname,
      phoneNumber: phoneNumber,
      avatar: profilePictureSrc,
    };
    accountApi.update(profileRequest);
    props.history.push('/overview');
  };

  const cancel = () => {
    props.history.push('/');
  };

  const handleNicknameChange = (nickname: string) => {
    setProfilePictureText(nickname);
  };

  return (
    <>
      <section className={`hero  ${styles.gradient}`}>
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
          initialValues={initialFormValues}
          onSubmit={onSubmit}
          render={({ errors, touched, isSubmitting, handleBlur }: FormikProps<FormValues>) => (
            <Form className="container">
              <div className="control ">
                <span className="icon is-large fa-lg has-margin-left-25">
                  <i className="fas fa-phone-alt has-margin-right-10" />
                  <label className="label is-large ">Phone</label>
                </span>
              </div>
              <div className="field has-addons">
                <p className="control">
                  <a className={`button is-static is-medium ${styles.number}`}>+358</a>
                </p>
                <div className="control">
                  <Field
                    type="tel"
                    name="phoneNumber"
                    className={classNames('input is-large', {
                      'is-danger': touched.phoneNumber && errors.phoneNumber,
                    })}
                  />
                  <Error
                    fieldName="phoneNumber"
                    isVisible={!!(touched.phoneNumber && errors.phoneNumber)}
                  />
                </div>
              </div>
              <div className="control">
                <span className="icon is-large fa-lg has-margin-left-50">
                  <i className="fas fa-user has-margin-right-10" />
                  <label className="label is-large">Nickname</label>
                </span>
              </div>
              <div className="field">
                <div className="control ">
                  <Field
                    name="nickname"
                    className={classNames('input is-large', {
                      'is-danger': touched.nickname && errors.nickname,
                    })}
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleBlur(e);
                      handleNicknameChange(e.target.value);
                    }}
                  />
                  <Error fieldName="nickname" isVisible={!!(touched.nickname && errors.nickname)} />
                </div>
              </div>

              <footer className={`footer has-background-white center`}>
                <div className={`field is-flex is-full-width ${styles.bottom} ${styles.between}`}>
                  <div className="control">
                    <button
                      type="submit"
                      className="button is-primary is-large"
                      disabled={isSubmitting}
                    >
                      Update
                    </button>
                  </div>
                  <div className="control">
                    <button
                      type="submit"
                      className="button is-text is-large"
                      disabled={isSubmitting}
                      onClick={() => {
                        cancel();
                        dispatchLogout(new Logout());
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </footer>
            </Form>
          )}
        />
      </section>
    </>
  );
};

export default withRouter(UserSettings);
