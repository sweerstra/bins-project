import React, { Component } from 'react';
import images from '../assets/images';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authenticate } from '../actions/index';
import './passphrase.css';

class Passphrase extends Component {
  constructor() {
    super();
    this.state = { passphrase: '', disableConfirm: true, rejected: false };
  }

  render() {
    const { disableConfirm, rejected } = this.state;
    const { hasPermission } = this.props.permission;

    if (hasPermission) {
      return <Redirect to="/bin"/>;
    }

    return (
      <div className="passphrase">
        <div className="passphrase__content">
          <h1>Viewing JS bins
            <img src={images.garbageBin} width={60} height={60}/>
          </h1>
          <form onSubmit={this.onConfirm.bind(this)}>
            <label>
              Enter your passphrase below
              <input type="text" className={rejected ? 'rejected' : ''}
                     onChange={this.onTextChange.bind(this)}
                     placeholder="phrase" spellCheck="false" autoFocus="true"/>
            </label>
            <p className="rejected" style={{ visibility: rejected ? 'visible' : 'hidden' }}>Wrong passphrase, try
              again.</p>
            <button disabled={disableConfirm}>
              Confirm
            </button>
          </form>
          <a href="#" onClick={this.onReadOnly.bind(this)}>Or continue in read-only mode.</a>
        </div>
      </div>
    );
  }

  onTextChange({ target: { value } }) {
    this.setState({
      passphrase: value,
      disableConfirm: value.length <= 3
    });
  }

  onConfirm(e) {
    e.preventDefault();

    this.props.onAuthenticate(this.state.passphrase)
      .then(({ isAuthenticated }) => {
        if (isAuthenticated === false) {
          this.setRejected();
        }
      });
  }

  setRejected() {
    this.setState({ rejected: true });
    setTimeout(() => {
      this.setState({ rejected: false });
    }, 3000);
  }

  onReadOnly(e) {
    e.preventDefault();

    this.props.history.push('/bin');
  }
}

const mapStateToProps = ({ permission }) => {
  return { permission };
};

const mapDispatchToProps = (dispatch) => ({
  onAuthenticate: (passphrase) => dispatch(authenticate(passphrase))
});

export default connect(mapStateToProps, mapDispatchToProps)(Passphrase);
