import React from 'react';
import { Formik, FormikProps, Form, FieldArray } from 'formik';
import styles from './styles.module.scss';
import FooterMenu from '../../common/component/footer-menu';
import { FormValues } from './types';
import { store } from '../../app';
import { Player } from '../../core/game/state/types';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Finish } from '../../core/socket/state/actions';
import { RootState } from '../../core/state';
import { Ranks } from '../../core/socket/state/types';

function getInitialFormValues(players: Player[]) {
  const initialFormValues: FormValues = { ranks: [] };

  for (let index = 0; index < players.length; index++) {
    initialFormValues.ranks.push(players[0].nickname);
  }

  return initialFormValues;
}

function determinePlayerRanks(form: FormValues, players: Player[]): number[] {
  const ranks: number[] = [];
  form.ranks.forEach(playerNickname => {
    const player = players.find(player => player.nickname === playerNickname);
    if (player !== undefined) {
      ranks.push(player.accountId);
    }
  });

  return ranks;
}

function isValid(ranks: number[]): boolean {
  return ranks.length === new Set(ranks).size;
}

const AdminRank = () => {
  const dispatchFinish = useDispatch<Dispatch<Finish>>();
  const gameId = useSelector((state: RootState) => state.game.data.gameId);
  const players: Player[] = store.getState().game.data.players;
  const initialFormValues: FormValues = getInitialFormValues(players);

  const onChange = (
    e: any,
    setFieldValue: (field: string, value: string[]) => void,
    values: FormValues,
  ) => {
    const ranks: string[] = values.ranks;
    const playerRank: number = e.target.value;
    const playerName: string = e.target.options[e.target.selectedIndex].text;
    ranks[playerRank] = playerName;
    setFieldValue('ranks', ranks);
  };

  const onSubmit = (form: FormValues, setSubmitting: (isSubmitting: boolean) => void) => {
    const rankedAccountsIds: number[] = determinePlayerRanks(form, players);
    if (!isValid(rankedAccountsIds)) {
      window.alert('Ranks are invalid');
    } else {
      const ranks: Ranks = {
        rankedAccountsIds: rankedAccountsIds,
        gameId: gameId,
      };
      dispatchFinish(new Finish(ranks));
    }
    setSubmitting(false);
  };

  return (
    <>
      <section className="hero is-primary is-fullheight">
        <div className="hero-body flex-column">
          <h1 className="subtitle is-size-1">Placement</h1>
          <Formik
            initialValues={initialFormValues}
            enableReinitialize={true}
            onSubmit={(values, { setSubmitting }) => {
              onSubmit(values, setSubmitting);
            }}
            render={({ isSubmitting, values, setFieldValue }: FormikProps<FormValues>) => (
              <Form className="has-margin-top-25 is-full-width">
                <FieldArray
                  name="ranks"
                  render={() => (
                    <div>
                      {players.map((_player, index) => (
                        <div className="columns is-mobile" key={index}>
                          <div className="column is-1">
                            <p className="is-size-2">{index + 1}</p>
                          </div>
                          <div className="column is-11">
                            <div className="field">
                              <div className="control">
                                <div className="select is-large is-info is-expanded is-fullwidth">
                                  <select
                                    onChange={e => {
                                      onChange(e, setFieldValue, values);
                                    }}
                                  >
                                    {players.map(player => (
                                      <option value={index} key={`${index} ${player.accountId}`}>
                                        {player !== undefined && player.nickname}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                ></FieldArray>

                <div className={`field ${styles.bot}`}>
                  <div className="control">
                    <button
                      type="submit"
                      className="is-size-2 button is-success is-fullwidth is-rounded "
                      disabled={isSubmitting}
                    >
                      Finish
                    </button>
                  </div>
                </div>
              </Form>
            )}
          />
        </div>
        <FooterMenu />
      </section>
    </>
  );
};
export default AdminRank;
