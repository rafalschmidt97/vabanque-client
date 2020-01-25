import React, { Dispatch } from 'react';
import FooterMenu from '../../common/component/footer-menu';
import Helmet from 'react-helmet';
import { Form, Formik, FormikProps } from 'formik';
import { FormSchema, FormValues, initialFormValues } from './types';
import Code from './code';
import { useDispatch, useSelector } from 'react-redux';
import JoinButton from './join';
import { Join } from '../../core/socket/state/actions';
import { RootState } from '../../core/state';
import { failedRequests } from '../../app';
import GoBack from '../../common/component/go-back-button';
import styles from './styles.module.scss';

const FindLobby = () => {
  let joinFailed = useSelector((state: RootState) => state.game.failedRequests.join);
  const dispatchJoin = useDispatch<Dispatch<Join>>();
  const onSubmit = (
    form: FormValues,
    setFieldError: (field: string, message: string) => void,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    dispatchJoin(new Join(form.code));
    setTimeout(() => {
      joinFailed = failedRequests().join;
      if (joinFailed) {
        setFieldError('code', "Game with such code doesn't exist");
        setSubmitting(false);
      }
    }, 100);
  };

  return (
    <>
      <Helmet>
        <title>Find Lobby</title>
      </Helmet>
      <GoBack />
      <section className="hero is-primary is-fullheight">
        <div className={`hero-body ${styles.padding}`}>
          <Formik
            validationSchema={FormSchema}
            initialValues={initialFormValues}
            enableReinitialize={true}
            onSubmit={(values, { setFieldError, setSubmitting }) => {
              onSubmit(values, setFieldError, setSubmitting);
            }}
            render={({ errors, touched, isSubmitting }: FormikProps<FormValues>) => (
              <Form className="container">
                <Code hasErrors={!!(touched.code && errors.code)} />
                <JoinButton isSubmitting={isSubmitting} joinFailed={joinFailed} />
              </Form>
            )}
          />
        </div>
        <FooterMenu />
      </section>
    </>
  );
};
export default FindLobby;
