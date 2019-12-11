import React from 'react';
import FooterMenu from '../../common/component/footer-menu';
import Helmet from 'react-helmet';
import { Form, Formik, FormikProps, Field } from 'formik';
import { FormSchema, FormValues } from './types';
import { initialFormValues } from './types';
import styles from './styles.module.scss';
import classNames from 'classnames';
import ErrorLabel from '../../common/component/error';

const CreateGame = () => {
  const onSubmit = () => {};
  return (
    <>
      <Helmet>
        <title>Create Game</title>
      </Helmet>
      <section className={`hero is-primary is-fullheight`}>
        <div className="hero-body">
          <Formik
            validationSchema={FormSchema}
            initialValues={initialFormValues}
            enableReinitialize={true}
            onSubmit={() => {
              onSubmit();
            }}
            render={({ errors, touched, isSubmitting }: FormikProps<FormValues>) => (
              <Form className="container">
                <div className={`tags has-addons ${styles.top} is-centered `}>
                  <span className="tag is-warning is-size-3">0</span>
                  <span className="tag is-warning is-size-3">5</span>
                  <span className="tag is-info is-size-3">3</span>
                  <span className="tag is-info is-size-3">0</span>
                </div>

                <div className="field ">
                  <div
                    className={`control has-text-centered has-margin-bottom-75 ${styles.center}`}
                  >
                    <Field
                      name="entry"
                      className={classNames(
                        `input has-text-centered ${styles.entry} is-rounded is-size-1 has-text-success`,
                        {
                          'is-danger': !!(touched.entry && errors.entry),
                        },
                      )}
                    />
                    <ErrorLabel
                      fieldName="code"
                      isVisible={!!(touched.entry && errors.entry)}
                      color="has-text-light"
                    />
                  </div>
                </div>
                <div className={`field ${styles.create}`}>
                  <div className="control">
                    <button
                      className={`is-size-2 button is-large is-light-purple is-fullwidth is-rounded `}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </Form>
            )}
          />
        </div>
      </section>
      <FooterMenu />
    </>
  );
};
export default CreateGame;
