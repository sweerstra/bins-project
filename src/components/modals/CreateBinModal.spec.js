import React from 'react';
import CreateBinModal from './CreateBinModal';
import { fireEvent, render } from '../../test-utils';

const onSave = jest.fn();
const onClose = jest.fn();
const initialProps = { isOpen: true, onSave, onClose };

const MOCK_TEXT_VALUE = 'Mock text value';

const setup = () => render(<CreateBinModal {...initialProps}/>);

describe('<CreateBinModal />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('saves only when modal has input', () => {
    const { getByText, getByLabelText } = setup();
    const saveButton = getByText(/Save/i);
    fireEvent.click(saveButton);
    expect(onSave).not.toHaveBeenCalled();

    const input = getByLabelText(/Name/i);
    fireEvent.change(input, { target: { value: MOCK_TEXT_VALUE } });
    fireEvent.click(saveButton);
    expect(onSave).toHaveBeenCalledWith({ name: MOCK_TEXT_VALUE });
  });

  it('should close and reset input when cancelled', () => {
    const { getByText, getByLabelText } = setup();
    const input = getByLabelText(/Name/i);
    fireEvent.change(input, { target: { value: MOCK_TEXT_VALUE } });

    const cancelButton = getByText(/Cancel/i);
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('');
  });
});
