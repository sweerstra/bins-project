import React from 'react';
import ConfirmModal from './ConfirmModal';
import { fireEvent, render } from '../../test-utils';

const onConfirm = jest.fn();
const onCancel = jest.fn();
const initialProps = { onConfirm, onCancel };

const setup = ({ isConfirmable }) => render(
  <ConfirmModal isConfirmable={isConfirmable} {...initialProps} />
);

describe('<ConfirmModal />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('confirm button is enabled when confirmable', () => {
    const { getByText } = setup({ isConfirmable: true });
    const saveButton = getByText(/Save/);
    fireEvent.click(saveButton);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('confirm button is disabled when not confirmable', () => {
    const { getByText } = setup({ isConfirmable: false });
    const saveButton = getByText(/Save/);
    fireEvent.click(saveButton);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('cancels when cancel button is clicked', () => {
    const { getByText } = setup({ isConfirmable: false });
    const cancelButton = getByText(/Cancel/);
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
