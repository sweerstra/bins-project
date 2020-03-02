import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';
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

const ConfirmModal = ({ isConfirmable, onConfirm, onCancel, children, ...rest }) => (
  <Modal closable={false} {...rest}>
    {children}
    <Buttons>
      <CancelButton onClick={onCancel}>Cancel</CancelButton>
      <ConfirmButton onClick={onConfirm} disabled={!isConfirmable}>Save</ConfirmButton>
    </Buttons>
  </Modal>
);

export default ConfirmModal;
