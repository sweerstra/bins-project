import React, { Component } from 'react';
import images from '../../assets/images';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authenticate } from '../../actions/index';
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
            <img src={images.garbageBin} width={60} height={60} alt="Logo"/>
          </h1>
          <form onSubmit={this.onConfirm.bind(this)}>
            <label>
              Enter your passphrase below
              <input type="text" className={rejected ? 'rejected' : ''}
                     onChange={this.onTextChange.bind(this)}
                     ref={input => this.input = input}
                     placeholder="phrase" autoFocus="true" spellCheck="false" autoCapitalize="none"/>
            </label>
            <p className="rejected" style={{ visibility: rejected ? 'visible' : 'hidden' }}>
              Wrong passphrase, try again.
            </p>
            <button disabled={disableConfirm}>
              Confirm
            </button>
          </form>
          <div className="read-only">
            <a onClick={this.onReadOnly.bind(this)}>Or continue in read-only mode.</a>
          </div>
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
    const { target } = e;
    e.preventDefault();

    this.props.onAuthenticate(this.state.passphrase)
      .then(result => {
        if (result === false) {
          this.showRejectionMessage(() => {
            target.reset();
            this.input.focus();
          });
        }
      });
  }

  showRejectionMessage(callback) {
    this.setState({ rejected: true });
    setTimeout(() => {
      this.setState({ rejected: false });
      callback();
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
