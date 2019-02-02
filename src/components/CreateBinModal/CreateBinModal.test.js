import React from 'react';
import { shallow } from 'enzyme';
import CreateBinModal from './CreateBinModal';
import { Input } from '../../ui';

test('CreateBinModal functions when isOpen is set true', () => {
  const modal = shallow(<CreateBinModal isOpen={true}/>);

  modal.find(Input).simulate('change', { target: { name: 'name', value: 'bin' } });

  expect(modal.state().name).toEqual('bin');
});
