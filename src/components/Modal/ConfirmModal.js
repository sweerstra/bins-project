import React from 'react';
import styled from 'styled-components';
import Modal from './index';
import { Button } from '../../ui';

const Buttons = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
`;

const ConfirmButton = styled(Button).attrs({ color: 'success' })`
  margin-left: 1rem;
`;

const CancelButton = styled(Button).attrs({ outline: true })``;

const ConfirmModal = ({ confirmable = true, onConfirm, onModalClose, disableSave, children, ...rest }) => (
  <Modal onModalClose={onModalClose} {...rest}>
    {children}
    {confirmable && <Buttons>
      <CancelButton onClick={onModalClose}>Cancel</CancelButton>
      <ConfirmButton onClick={onConfirm} disabled={disableSave}>Save</ConfirmButton>
    </Buttons>}
  </Modal>
);

export default ConfirmModal;
