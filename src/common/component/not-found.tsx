import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <section className="hero is-fullheight has-text-centered">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Page not found</h1>
            <h2 className="subtitile">
              <Link to="/settings" className="button ">
                Back to User Settings
              </Link>
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
