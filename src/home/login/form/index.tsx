import React, { Dispatch, useState } from 'react';
import { FormSchema, FormValues, initialFormValues } from './types';
import { useDispatch } from 'react-redux';
import { Login } from '../../../core/auth/state/actions';
import { useHistory } from 'react-router';
import authApi from '../../../core/auth/api';
import { AxiosError } from 'axios';
import { Form, Formik, FormikProps } from 'formik';
import Email from './field/email';
import Password from './field/password';
import { Token } from '../../../core/auth/types';

const LoginForm = () => {
  const [formValues] = useState<FormValues>(initialFormValues);

  const dispatchLogin = useDispatch<Dispatch<Login>>();
  const history = useHistory();

  const onSubmit = (
    form: FormValues,
    setFieldError: (field: string, message: string) => void,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    authApi
      .signInWithEmail(form)
      .then((token: Token) => {
        dispatchLogin(new Login(token));
        history.push('game');
      })
      .catch((error: AxiosError) => {
        if (error.response !== undefined) {
          if (error.response.status === 409) {
            setFieldError('nickname', 'That nickname already exists');
            setSubmitting(false);
          }
        }
      });
  };

  return (
    <Formik
      validationSchema={FormSchema}
      initialValues={formValues}
      enableReinitialize={true}
      onSubmit={(values, { setFieldError, setSubmitting }) => {
        onSubmit(values, setFieldError, setSubmitting);
      }}
      render={({ errors, touched, isSubmitting }: FormikProps<FormValues>) => (
        <Form className="container">
          <Email hasErrors={!!(touched.email && errors.email)} />
          <Password hasErrors={!!(touched.email && errors.email)} />

          <div className="control">
            <button
              type="submit"
              disabled={isSubmitting}
              className="button is-black is-large is-full-width"
            >
              Login
            </button>
          </div>
        </Form>
      )}
    />
  );
};

export default LoginForm;
