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

const UpdateInfoForm: FC<Props> = props => {
  const onSubmit = (form: FormValues) => {
    console.log(form);
  };

  return (
    <>
      <section className={`hero ${styles.gradient}`}>
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title has-text-white">Avatar</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div />
        <div className="container">
          <Formik
            validationSchema={FormSchema}
            initialValues={initialFormValues}
            onSubmit={onSubmit}
            render={({ errors, touched, isSubmitting }: FormikProps<FormValues>) => (
              <Form className="">
                <div className="field">
                  <div className="control">
                    <Field
                      type="email"
                      name="email"
                      placeholder="email"
                      className={classNames('input', {
                        'is-invalid': touched.email && errors.email,
                      })}
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <Field
                      type="password"
                      name="password"
                      placeholder="password"
                      className={classNames('input', {
                        'is-invalid': touched.password && errors.password,
                      })}
                    />
                  </div>
                </div>

                <div className="field is-grouped">
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
              </Form>
            )}
          />
        </div>
      </section>
    </>
  );
};

UpdateInfoForm.defaultProps = { example: true };
export default withRouter(UpdateInfoForm);
