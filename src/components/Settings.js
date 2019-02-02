import React from 'react';
import styled from 'styled-components';
import { flexBetween } from '../ui/mixins';
import { Checkbox, Label } from '../ui';

const Wrapper = styled.div`
  form {
    position: relative;
  }
`;

const Fieldset = styled.fieldset`
  padding: 0;
  border: 0;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const ListItem = styled.li`
  width: 16rem;
  height: 4rem;
  ${flexBetween};
`;

const ItemLabel = styled.span`
  font-size: 1.3rem;
`;

const Divider = styled.hr`
  border: 0;
	border-top: .1rem solid ${p => p.theme.color.tertiary};
	margin: 2rem 0 0 0;
`;

export default function Settings({ settings: { consoles }, onChange }) {
  function onConsoleChange(e) {
    const { name, checked } = e.target;

    if (!name) {
      return console.error(`name attribute of checkbox is empty`);
    }

    if (name === 'enabled') {
      consoles.enabled = checked;
    } else {
      consoles.values[name] = checked;
    }

    onChange('consoles', consoles);
  }

  return (
    <Wrapper>
      <form onSubmit={e => {
        e.preventDefault();
      }}>
        <Label>
          Consoles to use
        </Label>
        <ListItem>
          <ItemLabel>Hide Console</ItemLabel>
          <Checkbox name="enabled" checked={consoles.enabled} onChange={onConsoleChange}/>
        </ListItem>
        <Fieldset disabled={consoles.enabled}>
          <List>
            {Object.entries(consoles.values).map(([type, value]) =>
              <ListItem key={type}>
                <ItemLabel>{type}</ItemLabel>
                <Checkbox name={type} checked={value} onChange={onConsoleChange}/>
              </ListItem>
            )}
          </List>
        </Fieldset>
        <Divider/>
      </form>
    </Wrapper>
  );
}
