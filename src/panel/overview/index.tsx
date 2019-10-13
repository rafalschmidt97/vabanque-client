import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { IncrementCounter } from './actions';
import { Dispatch } from 'redux';
import { RootState } from '../../common/state';

type Props = {
  counter: number;
  increment: () => void;
};

type State = {
  localCounter: number;
};

class Overview extends Component<Props, State> {
  state = {
    localCounter: 1,
  };

  incrementLocal = () => {
    this.setState({
      localCounter: this.state.localCounter + 1,
    });
  };

  increment = () => {
    this.props.increment();
  };

  render() {
    const { localCounter } = this.state;
    const { counter } = this.props;

    return (
      <>
        <Helmet>
          <title>Overview</title>
        </Helmet>
        <div className="">
          <div className="">
            <div className="">
              <div className="">
                <h1 className="">Overview</h1>
                <p>Welcome in panel.</p>
                <button onClick={this.incrementLocal} type="button" className="">
                  State counter: {localCounter}
                </button>
                <button onClick={this.increment} type="button" className="">
                  Redux counter: {counter}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    counter: state.overview.counter,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    increment: () => dispatch(new IncrementCounter()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Overview);
