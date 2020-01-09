import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import FooterMenu from '../common/component/footer-menu';
import styles from './styles.module.scss';
import debtorApi from './api/api';
import { Debtor, Creditor } from './types';
import Modal from './contact';

const Money = () => {
  const initialCreditors: Creditor[] = [];
  const [creditors, setCreditors] = useState(initialCreditors);
  const initialDebtors: Debtor[] = [];
  const [debtors, setDebtors] = useState(initialDebtors);
  useEffect(() => {
    debtorApi.getCreditors({ page: 1 }).then(data => {
      setCreditors(data);
    });
    debtorApi.getDebtors({ page: 1 }).then(data => {
      setDebtors(data);
    });
  }, []);

  const deleteDebtor = (debtorId: number) => {
    debtorApi.deleteDebtor({ debtorId: debtorId }).then(() => {
      debtorApi.getDebtors({ page: 1 }).then(data => setDebtors(data));
    });
  };

  const renderCreditors = (creditors: Creditor[]) => {
    if (creditors !== undefined) {
      if (creditors.length !== 0) {
        return (
          <>
            {creditors.map(creditor => {
              let isModalOpen = false;
              return (
                <div key={creditor.id}>
                  <div className={`column has-background-primary-contrast ${styles.border}`}>
                    <div className="columns is-full-width is-mobile">
                      <div className="column is-2">
                        <span className={`icon is-large ${styles.center}`}>
                          <i className="fas fa-user fa-2x" />
                        </span>
                      </div>
                      <div className="column is-8 has-text-centered">
                        <span className={`is-size-2 has-text-light ${styles.center}`}>
                          {creditor.nickname}{' '}
                        </span>
                        <span className={`is-size-2 has-text-light ${styles.center}`}>
                          {creditor.amount}
                        </span>
                      </div>
                      <div
                        className="column is-2"
                        onClick={() => {
                          isModalOpen = true;
                          window.alert(
                            `${creditor.nickname}'s phone number is ${creditor.phoneNumber}`,
                          );
                        }}
                      >
                        <span className={`icon is-large has-text-success ${styles.center}`}>
                          <i className="fas fa-mobile-alt fa-3x" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <Modal isActive={isModalOpen} text={creditor.phoneNumber} />
                </div>
              );
            })}
          </>
        );
      } else {
        return <></>;
      }
    }
  };

  const renderDebtors = (debtors: Debtor[]) => {
    if (debtors !== undefined) {
      if (debtors.length !== 0) {
        return (
          <>
            {debtors.map(debtor => (
              <div className={`column has-background-debtor ${styles.border}`} key={debtor.id}>
                <div className="columns is-full-width is-mobile">
                  <div className="column is-2">
                    <span className={`icon is-large ${styles.center}`}>
                      <i className="fas fa-user fa-2x" />
                    </span>
                  </div>
                  <div className="column is-8  has-text-centered">
                    <span className={`is-size-2 has-text-light ${styles.center}`}>
                      {debtor.nickname}{' '}
                    </span>
                    <span className={`is-size-2 has-text-light ${styles.center}`}>
                      {debtor.amount}
                    </span>
                  </div>
                  <div
                    className="column is-2"
                    onClick={() => {
                      deleteDebtor(debtor.id);
                    }}
                  >
                    <span className={`icon is-large has-text-debtor-trash ${styles.center}`}>
                      <i className="fas fa-trash-alt fa-2x" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        );
      } else {
        return <></>;
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Money</title>
      </Helmet>
      <div className="box is-full-width has-text-centered is-marginless">
        <h1 className="title has-text-black">Own List</h1>
      </div>
      <section className="hero is-primary is-fullheight">
        <div className="hero-body flex-column is-paddingless">
          <div className="columns is-full-width">
            {renderCreditors(creditors)} {renderDebtors(debtors)}
          </div>
        </div>
        <FooterMenu />
      </section>
    </>
  );
};

export default Money;
