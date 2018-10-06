import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConfirmModal from '../Modal/ConfirmModal';
import { Input, Label } from '../../ui';

class CreateBinModal extends Component {
  state = {
    name: ''
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onSave = () => {
    this.props.onSave(this.state);
  };

  render() {
    const { isOpen, onClose } = this.props;

    return (
      <ConfirmModal
        isOpen={isOpen}
        title="Create Bin"
        onModalClose={onClose}
        onConfirm={this.onSave}>
        <Label>
          Name
          <Input name="name" onChange={this.onChange}/>
        </Label>
      </ConfirmModal>
    );
  }
}

CreateBinModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CreateBinModal;
