import React from 'react';
import Modal from './Modal';
import { fireEvent, render } from '../../test-utils';

const onClose = jest.fn();
const initialProps = { onClose };

const setup = (additionalProps) => render(
  <Modal {...initialProps} {...additionalProps} />
);

describe('<Modal />', () => {
  it('renders title', () => {
    const title = 'Title text';
    const { getByText } = setup({ isOpen: true, title });
    expect(getByText(title)).toBeInTheDocument();
  });

  it('renders children', () => {
    const childText = 'Child with content';
    const { getByText } = render(
      <Modal {...initialProps}>
        <div>{childText}</div>
      </Modal>
    );
    expect(getByText(childText)).toBeInTheDocument();
  });

  it('shows modal when opened', () => {
    const { getByTestId } = setup({ isOpen: true });
    expect(getByTestId('modal-container')).toBeVisible();
  });

  it('hides modal when not opened', () => {
    const { getByTestId } = setup({ isOpen: false });
    expect(getByTestId('modal-container')).not.toBeVisible();
  });

  it('doesn\t render close button when closable is disabled', () => {
    const { queryByText } = setup({ closable: false });
    expect(queryByText('×')).not.toBeInTheDocument();
  });

  it('closes when close button clicked', () => {
    const { getByText } = setup();
    fireEvent.click(getByText('×'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
