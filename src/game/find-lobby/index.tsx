import React, { Dispatch } from 'react';
import FooterMenu from '../../common/component/footer-menu';
import Helmet from 'react-helmet';
import { Form, Formik, FormikProps } from 'formik';
import { FormSchema, FormValues } from './types';
import { initialFormValues } from './types';
import Code from './code';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import JoinButton from './join';
import { Join } from '../../core/socket/state/actions';
import { RootState } from '../../core/state';
import { store } from '../../app';

const JoinGame = () => {
  let joinFailed = useSelector((state: RootState) => state.game.failedRequests.join, shallowEqual);
  const dispatchJoin = useDispatch<Dispatch<Join>>();
  const onSubmit = (
    form: FormValues,
    setFieldError: (field: string, message: string) => void,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    dispatchJoin(new Join(form.code));
    setTimeout(() => {
      joinFailed = store.getState().game.failedRequests.join;
      if (joinFailed) {
        setFieldError('code', "Game with such code doesn't exist");
        setSubmitting(false);
      } else {
        console.log('successful join');
      }
    }, 100);
  };
  return (
    <>
      <Helmet>
        <title>Join Game</title>
      </Helmet>
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
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
export default JoinGame;
