import React from 'react';
import Helmet from 'react-helmet';
import SignInForm from './form';

const SignIn = () => {
  return (
    <>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <main className="">
        <div className="">
          <div className="">
            <div className="">
              <h1 className="">VaBanque</h1>
              <p>Feel free to add some code.</p>
            </div>
            <div className="">
              <SignInForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
