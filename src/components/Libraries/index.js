import React from 'react';
import styled from 'styled-components';
import { Input, Label, Link } from '../../ui';
import { flexBetween } from '../../ui/mixins';

const Wrapper = styled.div``;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const ListItem = styled.li`
  width: 100%;
  height: 4rem;
  ${flexBetween};
`;

const RemoveLinkSign = styled.span`
  font-size: 2.2rem;
  cursor: pointer;
  
  &:hover {
    color: ${p => p.theme.color.primary};
  }
`;

const Divider = styled.hr`
  border: 0;
	border-top: .1rem solid ${p => p.theme.color.tertiary};
	margin: 2rem 0 0 0;
`;

const Libraries = ({ url, libraries, onAdd, onChange, onRemove, error }) => (
  <Wrapper>
    <form onSubmit={onAdd} autoComplete="off" spellCheck="false">
      <Label error={error}>
        {error ? 'We couldn\'t find that library 😞' : 'Add library URL'}
        <Input name="url" value={url} onChange={onChange} required/>
      </Label>

      <Divider/>

      <List>
        {libraries.length > 0
          ? libraries.map((library, index) =>
            <ListItem key={index}>
              <Link href={library.url}>{library.name}</Link>
              <RemoveLinkSign onClick={() => onRemove(library)}>&times;</RemoveLinkSign>
            </ListItem>)
          : <ListItem>
            There are no libraries here 😮
          </ListItem>}
      </List>
    </form>
  </Wrapper>
);

export default Libraries;
