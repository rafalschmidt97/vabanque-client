import React, { FC, useState } from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import UploadProfilePicture from './upload-profile-picture/upload-profile-picture';
import Error from '../common/components/error';

const props = {
  initialProfilePictureText: '',
};

type Props = RouteComponentProps & typeof props;

const initialFormValues = {
  email: '',
  username: '',
};

type FormValues = typeof initialFormValues;

const FormSchema = Yup.object().shape<FormValues>({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  username: Yup.string()
    .min(3, 'Username is too short')
    .max(50, 'Username is too long')
    .required('Required'),
});

const UpdateInfoForm: FC<Props> = defaultProps => {
  const [profilePictureText, setProfilePictureText] = useState(
    defaultProps.initialProfilePictureText,
  );

  const onSubmit = (form: FormValues) => {
    console.log(form);
  };

  const handleUsernameChange = (username: string) => {
    setProfilePictureText(username);
  };

  return (
    <>
      <section className={`hero  ${styles.gradient}`}>
        <div className={styles['hero-body']}>
          <UploadProfilePicture profilePictureText={profilePictureText} />
        </div>
      </section>

      <section className="section">
        <Formik
          validationSchema={FormSchema}
          initialValues={initialFormValues}
          onSubmit={onSubmit}
          render={({ errors, touched, isSubmitting, handleBlur }: FormikProps<FormValues>) => (
            <Form className="container">
              <div className="control">
                <span className="icon is-large fa-lg has-margin-left-25">
                  <i className="fas fa-envelope has-margin-right-10" />
                  <label className="label is-large">Email</label>
                </span>
              </div>
              <div className="field">
                <div className="control ">
                  <Field
                    type="email"
                    name="email"
                    className={classNames('input is-large', {
                      'is-danger': touched.email && errors.email,
                    })}
                  />
                  <Error fieldName="email" isVisible={!!(touched.email && errors.email)} />
                </div>
              </div>
              <div className="control">
                <span className="icon is-large fa-lg has-margin-left-50">
                  <i className="fas fa-user has-margin-right-10" />
                  <label className="label is-large">Username</label>
                </span>
              </div>
              <div className="field">
                <div className="control ">
                  <Field
                    name="username"
                    className={classNames('input is-large', {
                      'is-danger': touched.username && errors.username,
                    })}
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleUsernameChange(e.target.value);
                      handleBlur(e);
                    }}
                  />
                  <Error fieldName="username" isVisible={!!(touched.username && errors.username)} />
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

export default withRouter(UpdateInfoForm);
