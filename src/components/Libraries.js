import React, { useState } from 'react';
import styled from 'styled-components';
import { useInput } from '../hooks/form';
import { Input, Label, Link } from '../ui/index';
import { boxShadow, flexBetween } from '../ui/mixins';
import { themeHoverSwitch } from '../ui/theme';

const Wrapper = styled.div`
  form {
    position: relative;
  }
`;

const Suggestions = styled.ul`
  width: 100%;
  position: absolute;
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: ${p => p.show ? 'block' : 'none'};
  background-color: ${p => p.theme.color.white};
  border-radius: 0 0 .4rem .4rem;
  ${boxShadow};
`;

const Suggestion = styled.li`
  padding: 1rem;
  font-size: 1.2rem;

  &:hover {
    background-color: ${props => props.theme.color.tertiary};
    cursor: pointer;
  }
`;

export const LabelHeader = styled.span`
  ${flexBetween};
`;

const Presets = styled.span`
  color: ${p => p.theme.color.primary};
  font-weight: ${p => p.bold ? 'bold' : 'normal'};
  user-select: none;
  
  &:hover {
    color: ${p => themeHoverSwitch(p)};
    cursor: pointer;
  }
`;

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

function Libraries({ libraries, presets, onAdd, onRemove }) {
  const [url, setUrl, onUrlChange] = useInput();
  const [suggestionsAreVisible, setSuggestionsAreVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  function toggleSuggestions(e) {
    e.preventDefault();
    setSuggestionsAreVisible(!suggestionsAreVisible);
  }

  function addLibrary(e) {
    e.preventDefault();

    const name = url.split('/').pop();

    if (url && name) {
      setUrl('');
      setHasError(false);
      onAdd({ name, url });
    } else {
      setHasError(true);
    }
  }

  function addPresetLibrary(library) {
    setSuggestionsAreVisible(false);
    onAdd(library);
  }

  return (
    <Wrapper>
      <form onSubmit={addLibrary} autoComplete="off" spellCheck="false">
        <Label error={hasError}>
          <LabelHeader>
            {hasError ? 'This seems to be an invalid library 😞' : 'Add library URL'}
            <Presets onClick={toggleSuggestions}
                     color="primary"
                     bold={suggestionsAreVisible}>Presets</Presets>
          </LabelHeader>
          <Input value={url} onChange={onUrlChange} placeholder="https://example.com/library.js"/>
        </Label>

        <Suggestions show={suggestionsAreVisible}>
          {presets.map(library =>
            <Suggestion onClick={() => addPresetLibrary(library)} key={library.name}>
              {library.name}
            </Suggestion>
          )}
        </Suggestions>

        <Divider/>

        <List>
          {libraries.length > 0
            ? libraries.map(library =>
              <ListItem key={library.name}>
                <Link href={library.url}>{library.name}</Link>
                <RemoveLinkSign onClick={() => onRemove(library)}>&times;</RemoveLinkSign>
              </ListItem>)
            : <ListItem>
              No libraries were found. 📚
            </ListItem>}
        </List>
      </form>
    </Wrapper>
  );
}

export default Libraries;
