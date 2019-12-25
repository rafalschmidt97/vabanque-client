import React, { Dispatch } from 'react';
import FooterMenu from '../../common/component/footer-menu';
import Helmet from 'react-helmet';
import { Form, Formik, FormikProps, Field } from 'formik';
import { FormSchema, FormValues, initialProgression } from './types';
import { initialFormValues } from './types';
import styles from './styles.module.scss';
import classNames from 'classnames';
import ErrorLabel from '../../common/component/error';
import { useDispatch, useSelector } from 'react-redux';
import { Create } from '../../core/socket/state/actions';
import { RootState } from '../../core/state';
import { failedRequests } from '../../app';
import { useHistory } from 'react-router';

const CreateGame = () => {
  const history = useHistory();
  let createFailed = useSelector((state: RootState) => state.game.failedRequests.create);
  const dispatchCreate = useDispatch<Dispatch<Create>>();

  const onSubmit = (form: FormValues, setSubmitting: (isSubmitting: boolean) => void) => {
    console.log('whaat');
    dispatchCreate(
      new Create({
        duration: new Date(300000),
        entry: form.entry,
        progression: initialProgression,
      }),
    );
    setTimeout(() => {
      createFailed = failedRequests().create;
      if (createFailed) {
        window.alert('Create game failed');
        setSubmitting(false);
      }
    }, 100);
  };
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
            onSubmit={(values, { setSubmitting }) => {
              onSubmit(values, setSubmitting);
            }}
            render={({ errors, touched, isSubmitting }: FormikProps<FormValues>) => (
              <Form className="container">
                <div className={`tags has-addons ${styles.top} is-centered `}>
                  <span className="tag is-warning is-size-3">0</span>
                  <span className="tag is-warning is-size-3">5</span>
                  <span className="tag is-info is-size-3">0</span>
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
                  <div className="columns is-mobile">
                    <div className="control">
                      <div className="column">
                        <button
                          className={`is-size-3 button is-danger is-fullwidth is-rounded `}
                          disabled={isSubmitting}
                          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            e.preventDefault();
                            history.goBack();
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    <div className="column">
                      <div className="control">
                        <button
                          className={`is-size-3 button  is-light-purple is-fullwidth is-rounded `}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Create
                        </button>
                      </div>
                    </div>
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
