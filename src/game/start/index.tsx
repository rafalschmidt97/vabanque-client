import React from 'react';
import Helmet from 'react-helmet';
import FooterMenu from '../../common/component/footer-menu';
import { useHistory } from 'react-router';

const Start = () => {
  const history = useHistory();
  return (
    <>
      <Helmet>
        <title>Game Start</title>
      </Helmet>
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="container has-padding-bottom-75">
              <button className="button is-large is-success  is-fullwidth is-rounded  is-size-2">
                Create
              </button>
            </div>
            <div className="container has-margin-top-50">
              <button
                className="is-size-2 button is-large is-info is-fullwidth is-rounded"
                onClick={() => {
                  history.push('find-lobby');
                }}
              >
                Find
              </button>
            </div>
          </div>
        </div>
        <FooterMenu />
      </section>
    </>
  );
};
export default Start;
