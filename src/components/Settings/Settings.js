import React from 'react';
import styled from 'styled-components';
import { flexBetween } from '../../ui/mixins';
import { Checkbox, Label } from '../../ui';

const Wrapper = styled.div``;

const Form = styled.form`
  position: relative;
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

const ItemLabel = styled.label`
  font-size: 1.3rem;
`;

const Divider = styled.hr`
  border: 0;
	border-top: .1rem solid ${p => p.theme.color.tertiary};
	margin: 2rem 0 0 0;
`;

export default function Settings({ settings, onChange }) {
  function onSettingChange(e, key) {
    const { name, checked } = e.target;

    if (!name) {
      throw new Error('name attribute of checkbox is missing');
    }

    if (name === 'enabled') {
      onChange(key, { ...settings[key], enabled: checked });
    } else {
      const values = { ...settings[key].values, [name]: checked };
      onChange(key, { ...settings[key], values });
    }
  }

  return (
    <Wrapper>
      <Form onSubmit={e => e.preventDefault()}>
        {Object.entries(settings).map(([settingKey, settingValue]) =>
          <div key={settingKey}>
            <ListItem>
              <Label>{settingValue.label}</Label>
              <Checkbox name="enabled" checked={settingValue.enabled} onChange={e => onSettingChange(e, settingKey)}/>
            </ListItem>
            <Fieldset disabled={settingValue.enabled} name={settingKey}>
              <List>
                {Object.entries(settingValue.values).map(([type, value]) =>
                  <ListItem key={type}>
                    <Label bold={false}>
                      {type}
                      <Checkbox name={type} checked={value} onChange={e => onSettingChange(e, settingKey)}/>
                    </Label>
                  </ListItem>
                )}
              </List>
            </Fieldset>
            <Divider/>
          </div>)}
      </Form>
    </Wrapper>
  );
}
