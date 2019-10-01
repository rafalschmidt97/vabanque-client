import React from 'react';
import Helmet from 'react-helmet';
import SignInForm from './form';

const SignIn = () => {
  return (
    <>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <main className="container">
        <div className="jumbotron mt-5">
          <div className="row">
            <div className="col-lg-8 align-self-center">
              <h1 className="display-4 text-secondary">VaBanque</h1>
              <p>Feel free to add some code.</p>
            </div>
            <div className="col-lg-4">
              <SignInForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
