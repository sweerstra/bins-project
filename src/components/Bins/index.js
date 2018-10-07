import React from 'react';
import styled, { css } from 'styled-components';
import { Input, Label } from '../../ui/index';
import { Button } from '../../ui';
import { flexBetween } from '../../ui/mixins';

const Wrapper = styled.aside`
  grid-area: bins;
  background-color: ${p => p.theme.color.white};
  box-shadow: 0 4px 6px 0 ${p => p.theme.color.quaternary};
  z-index: 1;  
`;

const Section = styled.div`
  padding: ${p => p.theme.padding.medium};
  padding-bottom: 0;
`;

const Divider = styled.hr`
  border: 0;
	border-top: .1rem solid ${p => p.theme.color.tertiary};
	margin: 2rem 0 0 0;
`;

const ListHeader = styled.div`
  padding 0 ${p => p.theme.padding.medium};
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  padding-top: ${p => p.theme.padding.medium};
  list-style-type: none;
`;

const ListItem = styled.li`
  width: 100%;
  height: 5rem;
  padding: 0 ${p => p.theme.padding.medium};
  ${flexBetween};
  cursor: pointer;
  
  &:hover {
    background-color: ${p => p.theme.color.tertiary};
  }
  
  ${p => p.active && css`
    background-color: ${p => p.theme.color.tertiary};
    font-weight: bold;
  `}
  
  ${Button} {
    display: none;
  }
  
  &:hover ${Button} {
    display: block;
  }
`;

const Bins = ({ bins, selected, onSelect, onCreateNew, onSave, onRemove, onSearch }) => (
  <Wrapper>
    <Section>
      <Button onClick={onCreateNew}>Create New Bin</Button>
    </Section>

    <Section>
      <Button color="success"
              onClick={() => onSave(selected)}
              disabled={!selected.code}>Save Bin</Button>
    </Section>

    <Divider></Divider>

    <Section>
      <Label>
        Search bin
        <Input onChange={onSearch}/>
      </Label>
    </Section>

    <List>
      <ListHeader>
        <Label>
          Bins
        </Label>
      </ListHeader>
      {bins.map(bin =>
        <ListItem onClick={() => onSelect(bin)}
                  active={bin.id === selected.id}
                  key={bin.id}>
          {bin.name}
          <Button color="danger"
                  size="small"
                  onClick={e => {
                    e.stopPropagation();
                    onRemove(bin);
                  }}>Delete</Button>
        </ListItem>
      )}
    </List>
  </Wrapper>
);

export default Bins;
