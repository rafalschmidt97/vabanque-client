import React, { FC } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import * as Yup from 'yup';
import { Field, Form, Formik, FormikProps } from 'formik';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type Props = RouteComponentProps & {
  example?: boolean;
};

const initialFormValues = {
  email: '',
  password: '',
};

type FormValues = typeof initialFormValues;

const FormSchema = Yup.object().shape<FormValues>({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().required('Required'),
});

const SignInForm: FC<Props> = props => {
  const onSubmit = (form: FormValues) => {
    console.log(form);
  };

  return (
    <Formik
      validationSchema={FormSchema}
      initialValues={initialFormValues}
      onSubmit={onSubmit}
      render={({ errors, touched, isSubmitting }: FormikProps<FormValues>) => (
        <Form className={classNames({ [styles.example]: props.example })}>
          <Field
            type="email"
            name="email"
            placeholder="email"
            className={classNames('form-control', {
              'is-invalid': touched.email && errors.email,
            })}
          />

          <Field
            type="password"
            name="password"
            placeholder="password"
            className={classNames('form-control mt-2', {
              'is-invalid': touched.password && errors.password,
            })}
          />

          <button type="submit" className="btn btn-primary btn-block mt-2" disabled={isSubmitting}>
            Sign in
          </button>
        </Form>
      )}
    />
  );
};

SignInForm.defaultProps = { example: true };
export default withRouter(SignInForm);
